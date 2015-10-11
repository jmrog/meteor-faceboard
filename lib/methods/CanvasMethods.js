// TODO: Authorization and validation.
Meteor.methods({
    insertCirclePoint: function (wallId, data) {
        Canvas.update({ _id: wallId }, { $push: { circlePoints: data } });
    },
    clearCanvas: function (wallId) {
        Canvas.update({ _id: wallId }, { $set: { circlePoints: [] } });
    },
    'saveCanvas': function(wallId) {
        // creates a new canvas from the one being altered, as a "save point"
        var circlePoints = Canvas.find({ _id: wallId }).fetch()[0].circlePoints;
        return Canvas.insert({ circlePoints: circlePoints });
    },
    'getCanvasForId': function(wallId) {
        return Canvas.findOne({ _id: wallId });
    },
    'createCanvas': function(newWallId) {
        Canvas.insert({ _id: newWallId });
    }
});
