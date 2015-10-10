if (Meteor.isServer) {
    Meteor.methods({
        insertCirclePoint: function (coords) {
            // TODO: Authorization.
            CirclePoints.insert(coords);
        },
        clearCanvas: function () {
            // FIXME: Add auth check once auth is set up.
            CirclePoints.remove({});
        }
    });
}
