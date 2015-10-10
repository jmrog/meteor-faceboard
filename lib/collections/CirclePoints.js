CirclePoints = new Mongo.Collection('circle-points');

CirclePoints.allow({
    insert: function() {
        // FIXME: This is temporary.
        return true;
    }
});
