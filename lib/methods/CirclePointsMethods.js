Meteor.methods({
    insertCirclePoint: function(coords) {
        // TODO: Authorization.
        CirclePoints.insert(coords);
    }
});

