if (Meteor.isServer) {
    Meteor.methods({
        'saveCanvas': function() {
            // return gives back the _id
            return Canvas.insert({ circlePoints: CirclePoints.find().fetch() });
        }
    });
}
