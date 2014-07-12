define([
    "jquery",
    "underscore",
    "backbone",
    "text!templates/note.html",
], function ($, _, Backbone, noteTemplate) {
    var NoteView = Backbone.View.extend({
        tagName: "li",

        template: _.template(noteTemplate),

        events: {
            "click .destroy": "removeNote",
            "click .edit": "editNote",
            "keypress .edit-input": "updateNote"
        },

        initialize: function() {
            // events
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, "destroy", this.remove);
            this.listenTo(this.model, 'show', this.showNote);
            this.listenTo(this.model, 'hide', this.hideNote);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$input = this.$(".edit-input");
            return this;
        },

        editNote: function() {
            this.$el.addClass('editing');
            this.$input.focus();
        },

        updateNote: function(e) {
            // 13 is "return/enter" code
            if (e.keyCode === 13) {
                this.model.save({text: this.$input.val()});
                this.$el.removeClass('editing');
            }
        },

        removeNote: function() {
            this.model.destroy();
        },

        hideNote: function() {
            this.$el.addClass('hide');
        },

        showNote: function() {
            this.$el.removeClass('hide');
        }
    });

    return NoteView
});
