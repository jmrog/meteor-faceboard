if (Meteor.isClient) {
}

if (Meteor.isServer) {
    Meteor.publish('canvas', function(wallId) {
        return Canvas.find({ _id: wallId });
    });
}
