define([
    "underscore",
    "backbone",
    'backboneLocalstorage',
    "models/note"
], function(_, Backbone, Store, Note) {
    var NotesCollection = Backbone.Collection.extend({
        model: Note,
        url: "notes" // url of the REST API
    });

    return new NotesCollection();
});
