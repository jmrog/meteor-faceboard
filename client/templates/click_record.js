Template.clicksRecord.helpers({
    clickRecords: function() {
        return Clicks.find().fetch();
    }
});

