;(function(){
	'use strict';
	angular.module('Loft.User',[
		'ui.router'
		])
	.config(UserConfig)
	.controller('UserCtrl',userController);
	/*
	function userController($routeProvider){
		$routeProvider
		.when('/user',{
			templateUrl : 'app/user/user.html',
			controller : 'UserCtrl',
			controllerAs : 'uc'
		});
	}
	 */

	 function UserConfig($stateProvider){
	 	$stateProvider
		.state('user',{
			url: '/user',
			templateUrl : 'app/user/user.html',
			controller : 'UserCtrl',
			controllerAs : 'uc'
		});

	 }
	 userController.$inject = ['$scope'];
	function userController(){
		
	}

})();