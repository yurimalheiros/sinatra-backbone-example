define([
    'jquery',
    'backbone',
    'collections/notes',
], function ($, Backbone, Notes) {
    var NoteRouter = Backbone.Router.extend({
        routes: {
            '*filter': 'setFilter'
        },

        setFilter: function(param) {
            Notes.trigger("filter", param);
        }
    });

    return NoteRouter;
});