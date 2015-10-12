;(function(){
	'use strict';
	angular.module('Loft.Home',[
		//'ngRoute'
		'ui.router',
		'ui.bootstrap'
		])
		.config(HomeConfig)
		.controller('HomeCtrl',homeController);
	
 	//ngInject
	function homeController($scope, Authentication, $state){

		var self = this;
		self.createUser = {
			email : "",
			password : ""
		};
		$scope.createUse = true;
		self.userLogin = false;
		Authentication.getAuth();
		//Authentication.onAuth();

		self.addUser = function(_user){
			Authentication.createUser(_user);
			$state.go('users');
		}

		self.changeType = function(_input){
			console.log("==== change type =====");
			$scope.createUse = !(_input);
		}

		self.loginUser = function(_user){
			Authentication.authObj(_user)
			.then(function(authData) {
				  console.log("Logged in as:", authData.uid);
				  self.userLogin = "Logged in as:"+ authData.uid;
				  self.error = false;
				  //Authentication.getAuth();
				  $state.go('users');
				}).catch(function(error) {
					self.userLogin = "Authentication failed:"+ error;
				  console.error("Authentication failed:", error);
				  self.error = true;
				  Authentication.getAuth();
			});
		}

		//Authentication.getAuth();
		//Authentication.onAuth();
		//Authentication.createUser();
	}
/*
	function UsersConfig($routeProvider){
		$routeProvider
		.when('/users',{
			templateUrl : 'app/users/users.html',
			controller : 'UsersCtrl',
			controllerAs : 'usc'
		});
	}

*/

function HomeConfig($stateProvider){
		$stateProvider
		.state('home',{
			url: '/',
			templateUrl : 'app/home/home.html',
			controller : 'HomeCtrl',
			controllerAs : 'home'
		});
	}
})();
