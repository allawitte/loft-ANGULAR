;(function(){
	'use strict';
//registration part
	angular.module('Loft.Auth', [
		'Loft.Fire'
		])
	.factory('Authification', AuthificationFactory);
//ngInject
	function  AuthificationFactory(dbc, $firebaseAuth, $rootScope){
		var obj = {};

		var auth = $firebaseAuth(dbc.getRef());

		obj.authObj = function(_user){
			console.log('====  authObj  ====');
			return auth.$authWithPassword(_user);
		};

		obj.getAuth = function(){
			console.log('====  getAuth  ====');
			var authData = auth.$getAuth();
			if (authData) {
				 $rootScope.isUserLogged = true;
				  console.log("Logged in as:", authData.uid);
				} else {
				  $rootScope.isUserLogged = false;
				  console.log("Logged out");
			}
			//endif
		}//end of getAuth

		obj.onAuth = function(){
			console.log('====  onAuth  ====');
			auth.$onAuth(function(authData) {
			  if (authData) {
			    console.log("Logged in as:", authData.uid);
			    auth.$unauth();
			  } else {
			    console.log("Logged out");
			  }
			  obj.getAuth();
			});
		}//end of onAuth

		obj.createUser = function(newUser){
			console.log('====  createUser  ====');
			auth.$createUser(newUser)
			.then(function(userData) {
			  console.log("User " + userData.uid + " created successfully!");
	  
			  return auth.$authWithPassword(newUser); 
			  }).then(function(authData) {
			    console.log("Logged in as:", authData.uid);
			  }).catch(function(error) {
			    console.error("Error: ", error);
			  });
			
		}//end of createUser

		return obj;

		
	}//end of factory
})();