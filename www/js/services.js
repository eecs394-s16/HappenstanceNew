angular.module('starter.services', [])

var ref = new Firebase("https://happenstance.firebaseio.com");
ref.authWithPassword({
  email    : "katiegeorge@u.northwestern.edu",
  password : "test"
}, function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
});
});