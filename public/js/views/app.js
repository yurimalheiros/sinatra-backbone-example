define(["jquery",
        "underscore",
        "backbone",
        "collections/notes",
        "views/note",
        "text!templates/app.html"
], function($, _, Backbone, Notes, NoteView, appTemplate) {

    var AppView = Backbone.View.extend({
        el: "#noteapp",

        template: _.template(appTemplate),

        events : {
            "click #add-note": "createNote"
        },

        initialize: function() {
            Notes.fetch(); // get notes from server
            this.render();

            // DOM elements
            this.$input = this.$("#new-note");
            this.$radios = this.$(".colors");
            this.$noteList = this.$("#note-list");

            // events
            this.listenTo(Notes, "add", this.addNote);
            this.listenTo(Notes, 'filter', this.filterNotes);

        },

        render: function() {
            this.$el.html(this.template);
        },

        createNote: function() {
            var noteColor = this.$radios.filter(':checked').val();
            Notes.create({text: this.$input.val(), color: noteColor})
        },

        addNote: function(note) {
            var view = new NoteView({model: note});
            this.$noteList.append(view.render().el)
        },

        filterNotes: function(color) {
            Notes.each(function(model) {
                if (model.get("color") === color) {
                    model.trigger("show");
                } else if (color === null) {
                    // if no filter is set, then show all notes
                    model.trigger("show");
                } else {
                    model.trigger("hide");
                }
            });
        }
    });

    return AppView;
});
