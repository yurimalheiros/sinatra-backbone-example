############ API REST ############

# Require the bundler gem and then call Bundler.require to load in all gems
# listed in Gemfile
require 'bundler'
Bundler.require

# Setup DataMapper with a database URL. On Heroku, ENV['DATABASE_URL'] will be
# set, when working locally this line will fall back to using SQLite in the
# current directory
DataMapper.setup(:default, ENV['DATABASE_URL'] || "sqlite://#{Dir.pwd}/development.sqlite")

# Define a simple DataMapper model
class Note
  include DataMapper::Resource

  property :id, Serial, :key => true
  property :text, String, :length => 255
  property :color, String, :length => 255
end

# Finalize the DataMapper models
DataMapper.finalize

# Tell DataMapper to update the database according to the definitions above
DataMapper.auto_upgrade!

# Index route
get '/' do
  send_file 'index.html'
end

# Route to show all Notes
get '/notes' do
  content_type :json
  @notes = Note.all

  @notes.to_json
end

# CREATE: Route to create a new Note
post '/notes' do
  content_type :json

  # These next commented lines are for if you are using Backbone.js
  # JSON is sent in the body of the http request. We need to parse the body
  # from a string into JSON
  json_params = JSON.parse(request.body.read)

  @note = Note.new(json_params)

  if @note.save
    @note.to_json
  else
    halt 500
  end
end

# READ: Route to show a specific Note based on its "id"
get '/notes/:id' do
  content_type :json
  @note = Note.get(params[:id].to_i)

  if @note
    @note.to_json
  else
    halt 404
  end
end

# UPDATE: Route to update a Note
put '/notes/:id' do
  content_type :json

  # These next commented lines are for if you are using Backbone.js
  # JSON is sent in the body of the http request. We need to parse the body
  # from a string into JSON
  json_params = JSON.parse(request.body.read.to_s)

  @note = Note.get(params[:id].to_i)
  @note.update(json_params)

  if @note.save
    @note.to_json
  else
    halt 500
  end
end

# DELETE: Route to delete a Note
delete '/notes/:id' do
  content_type :json
  @note = Note.get(params[:id].to_i)

  if @note.destroy
    {:success => "ok"}.to_json
  else
    halt 500
  end
end

# If there are no Notes in the database, add a few.
if Note.count == 0
  Note.create(:text => "Test Note One", :color => "yellow")
  Note.create(:text => "Test Note Two", :color => "yellow")
end
