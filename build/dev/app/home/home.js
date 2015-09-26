;(function(){
	'use strict';
	angular.module('Loft.Home',[
		//'ngRoute'
		'ui.router'
		])
		.config(HomeConfig)
		.controller('HomeCtrl',homeController);
	
 homeController.$inject = ['$scope'];
	function homeController(){
		
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
