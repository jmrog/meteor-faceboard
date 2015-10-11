Meteor.methods({
    insertCirclePoint: function (data) {
        // TODO: Authorization.
        CirclePoints.insert(data);
    },
    clearCanvas: function () {
        // FIXME: Add auth check once auth is set up.
        CirclePoints.remove({});
    }
});
