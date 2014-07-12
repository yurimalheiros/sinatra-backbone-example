define([
    "underscore",
    "backbone"
], function (_, Backbone) {
    var Note = Backbone.Model.extend({
        defaults: {
            text: "",
            color: "yellow"
        }
    });

    return Note;
});
