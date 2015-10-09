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
	function homeController($scope, Authification){

		var self = this;
		self.createUser = {
			email : "",
			password : ""
		};
		Authification.getAuth();
		//Authification.onAuth();

		self.addUser = function(_user){
			Authification.createUser(_user);
		}
		

		self.loginUser = function(_user){
			Authification.authObj(_user)
			.then(function(authData) {
				  console.log("Logged in as:", authData.uid);
				  self.userLogin = "Logged in as:"+ authData.uid;
				  self.error = false;
				  Authification.getAuth();
				}).catch(function(error) {
					self.userLogin = "Authentication failed:"+ error;
				  console.error("Authentication failed:", error);
				  self.error = true;
				  Authification.getAuth();
			});
		}

		//Authification.getAuth();
		//Authification.onAuth();
		//Authification.createUser();
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
