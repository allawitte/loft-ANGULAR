;(function(){
	'use strict';
	angular.module('Loft.Users',[
		]).
	controller('UsersCtrl',usersController)
	.config(UsersConfig);

	function usersController(){
		
	}

	function UsersConfig($routeProvider){
		$routeProvider
		.when('/users',{
			templateUrl : 'app/users/users.html',
			controller : 'UsersCtrl',
			controllerAs : 'usc'
		});
	}

})();
