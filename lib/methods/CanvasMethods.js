if (Meteor.isServer) {
    Meteor.methods({
        'saveCanvas': function(optionalId) {
            // return gives back the _id
            if (optionalId) {
                Canvas.update({ _id: optionalId }, { $set: { circlePoints: CirclePoints.find().fetch() } });
                return optionalId;
            }
            return Canvas.insert({ circlePoints: CirclePoints.find().fetch() });
        },
        'getCanvasForId': function(wallId) {
            return Canvas.findOne({ _id: wallId });
        }
    });
}
