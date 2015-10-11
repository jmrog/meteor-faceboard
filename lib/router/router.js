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
    BlazeLayout.render('layout', {
      mainContent: "wall"
    });
  }
});

FlowRouter.route('/wall/:wallId', {
  name: 'wallId',
  action: function(params) {
    BlazeLayout.render('layout', {
      mainContent: "wall",
      wallId: params.wallId
    });
  }
});
