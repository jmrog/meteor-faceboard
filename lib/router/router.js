//router.js

FlowRouter.route('/', {
  name: "home",
  action: function() {
    BlazeLayout.render('layout', {

     
    });
  }
});


FlowRouter.route('/about', {
  name: "eval",
  action: function() {
    BlazeLayout.render('layout', {
      
    });
  }
});