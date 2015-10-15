;(function(){
	'use strict';
	angular.module('Loft.Sign',[
		'Loft.Auth'
		])
	.controller('SignInCtrl', SignInController)
	.controller('SignUpCtrl', SignUpController)
	.config(SignUpConfig)
	
	/*
	*** SignUp  Controller
	*/
	//ngInject
	function SignUpController(Authentication, $state, $rootScope){
		var self = this;

		function clean(){
			self.user = {
				email : null,
				password : null,
				fullname : null
			};
		};

		clean();

		self.facebookSignUp = function(){
			console.log("facebookSignIn Loft.Sign");
			Authentication
			.facebookSignUp()
			.then(function(e){
				$state.go('home');
			});
		}

		self.signUp = function(){
		    Authentication
	        .createUser(self.user)
	        .then(function(e){
	          clean();
	          $state.go('home');
	        });
	    
		};


	}//end of SignUpController
	/*
	*** SignIn  Controller
	*/
	//ngInject
	function SignInController(Authentication, $state, $rootScope){
		var self = this;

		function clean(){
			self.user = {
				email : null,
				password : null				
			};
		};

		clean();

		self.facebookSignIn = function(){
			console.log("facebookSignUp Loft.Sign");
			Authentication
			.facebookSignIn()
			.then(function(e){
				$state.go('home');
			});
		}

		self.signIn = function(){
			Authentication
	        .login(self.user)
	        .then(function(e){
	          clean();
	          $state.go('home');
	        })
	        .catch(function(error){
          switch (error.code) {
            case "INVALID_EMAIL":
              $rootScope.addAlert('The specified user account email is invalid.');
              console.log("The specified user account email is invalid.");
              break;
            case "INVALID_PASSWORD":
              console.log("The specified user account password is incorrect.");
              break;
            case "INVALID_USER":
              $rootScope.addAlert('The specified user account does not exist.');
              console.log("The specified user account does not exist.");
              break;
            default:
              $rootScope.addAlert('Error logging user in');
              console.log("Error logging user in:", error);
          }
        });
		};
	}//end of SignInController

	//ngInject
	function SignUpConfig($stateProvider){
		$stateProvider
		.state('signin',{
			url: '/signin',
			templateUrl : 'app/sign/sign-in.html',
			controller : 'SignInCtrl',
			controllerAs : 'sic'
		})
		.state('signup',{
			url: '/signup',
			templateUrl : 'app/sign/sign-up.html',
			controller : 'SignUpCtrl',
			controllerAs : 'suc'
		});
	}
	
})();	