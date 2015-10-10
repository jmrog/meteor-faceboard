if (Meteor.isClient) {
    Meteor.startup(function() {
        Meteor.subscribe('clicks');

        var mainDiv = document.getElementById('main');

        function mouseClickEvent(evt) {
            console.log('click');
            Clicks.insert({ message: 'Mouse click at coordinates: ' + evt.clientX + ', ' + evt.clientY });
        }

        mainDiv.addEventListener('click', mouseClickEvent, false);
    });
}

if (Meteor.isServer) {
    Meteor.publish('clicks', function() {
        return Clicks.find();
    });
    Clicks.allow({
        insert: function() {
            return true;
        }
    });
}
