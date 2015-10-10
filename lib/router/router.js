//router.js

FlowRouter.route('/', {
  name: "home",
  action: function() {
    BlazeLayout.render('layout', {
      mainContent: "main", 

    });
  }
});


FlowRouter.route('/about', {
  name: "about",
  action: function() {
    BlazeLayout.render('layout', {
      mainContent: "about", 
    });
  }
});


FlowRouter.route('/contact', {
  name: "contact",
  action: function() {
    BlazeLayout.render('layout', {
       mainContent: "contact", 

    });
  }
});


FlowRouter.route('/:userId/:wallId', {
  name: 'wall',
  action: function(params) {
    console.log("Yeah! We are on the wall:", params.userId);
      BlazeLayout.render('layout', {
        mainContent: "main", 
     
    });
  }
}); 