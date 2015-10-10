if (Meteor.isServer) {
    Meteor.methods({
        'saveCanvas': function() {
            Canvas.insert({ circlePoints: CirclePoints.find().fetch() });
        }
    });
}
