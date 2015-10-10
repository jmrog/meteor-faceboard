if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '770377653096860',
      xfbml      : true,
      version    : 'v2.5'
    });
  };




 /* FB.ui(
   {
     method: 'feed'
   }
  );
 */
  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
