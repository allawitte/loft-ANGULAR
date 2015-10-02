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
	function homeController($scope){
		
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
