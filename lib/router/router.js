//router.js

FlowRouter.route('/', {
  name: "home",
  action: function() {
    BlazeLayout.render('layout', {
      mainContent: "main"
    });
  }
});


FlowRouter.route('/about', {
  name: "about",
  action: function() {
    BlazeLayout.render('layout', {
      mainContent: "about"
    });
  }
});


FlowRouter.route('/contact', {
  name: "contact",
  action: function() {
    BlazeLayout.render('layout', {
       mainContent: "contact"
    });
  }
});

FlowRouter.route('/wall/', {
  name: 'wall',
  action: function() {
    var newWallId = Random.id();
    Meteor.call('createCanvas', newWallId, function() {
      FlowRouter.go('/wall/' + newWallId + '?newWall=true');
    });
  }
});

FlowRouter.route('/wall/:wallId', {
  name: 'wallId',
  action: function(params, queryParams) {
    Tracker.autorun(function () {
      Meteor.subscribe('canvas', params.wallId);
    });

    BlazeLayout.render('layout', {
      mainContent: "wall",
      wallId: params.wallId
    });
  }
});
