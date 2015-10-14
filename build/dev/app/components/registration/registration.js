;(function(){
	'use strict';
//registration part
	angular.module('Loft.Auth', [
		'Loft.Fire'
		])
	.factory('Authentication', AuthenticationFactory);
//ngInject
	function  AuthenticationFactory(dbc, $firebaseAuth, $rootScope, $firebaseObject){
		var obj = {};

		var ref = dbc.getRef();
		var auth = $firebaseAuth(ref);
		var usersRef = ref.child('users');

		obj.authObj = function(_user){
			console.log('====  authObj  ====');
			return auth.$authWithPassword(_user);
		};
		obj.login = function(_user){
			console.log('====  Login Existing User  ====');
			console.log(_user);
			return auth.$authWithPassword(_user);
		}

		obj.getAuth = function(){
			console.log('====  getAuth  ====');
			//var authData = auth.$getAuth();
			/*if (authData) {
				 
				  console.log("Logged in as:", authData.uid);
				} else {
				  
				  console.log("Logged out");
			}*/
			//endif
		}//end of getAuth

		obj.onAuth = function(){
			console.log('====  onAuth  ====');

			auth.$onAuth(function(authData) {
			  if (authData) {
			    console.log("Logged in as:", authData.uid);
			    var user = $firebaseObject(usersRef.child(authData.uid));
			    user.$loaded(function(_user){
			    	$rootScope.currentUser.fullname = _user.fullname;
			    })
			    
			    $rootScope.isUserLogged = true;
			    
			  } else {
			  	$rootScope.isUserLogged = false;
			  	$rootScope.currentUser.fullname = null;
			    console.log("Not logged in");
			    
			  }
			 // obj.getAuth();
			});
		}//end of onAuth

		obj.logoff = function(){
			console.log("Logged out");
			$rootScope.isUserLogged = false;
			auth.$unauth();
		}

		obj.onAuth();


	obj.createUser = function(newUser){
			console.log('====  createUser  ====');
			console.log(newUser);
			return auth.$createUser({
				'email' : newUser.email,
				'password' : newUser.password
			})
			.then(function(userData) {
			  console.log("User " + userData.uid + " created successfully!");
	  		usersRef.child(userData.uid)
	  		.set({
	  			fullname: newUser.fullname || 'Dear Friend',
	  			email: newUser.email,
	  			date: Firebase.ServerValue.TIMESTAMP
	  		});
			  return auth.$authWithPassword({
						'email' : newUser.email,
						'password' : newUser.password
					});
		  })
			.then(function(authData) {
		    console.log("Logged in as:", authData.uid);
		  }).catch(function(error) {
		    console.error("Error: ", error);
		  }); 
		}//end of createUser

		obj.facebookSignIn = function(){
			console.log("facebookSignIn");
			return auth.$authWithOAuthPopup("facebook").then(function(authData) {
					  console.log("Facebook Sign In:", authData.uid);
					}).catch(function(error) {
					  console.error("Authentication failed:", error);
					});
		}

		obj.facebookSignUp = function(){
			console.log("facebookSignUp");
			return auth.$authWithOAuthPopup("facebook")
			.then(function(authData) {
				usersRef.child(authData.uid)
			  		.set({
			  			fullname: authData.facebook.displayName,
			  			email: null,
			  			facebookId: authData.facebook.id,
			  			avatar: authData.facebook.profileImageURL,
			  			date: Firebase.ServerValue.TIMESTAMP
			  		});
					  console.log("Facebook Sign Up:", authData.uid);
					}).catch(function(error) {
					  console.error("Authentication failed:", error);
					});
		}

		return obj;

		
	}//end of factory  https://auth.firebase.com/v2/awfitness/auth/facebook/callback
})();