;(function(){
	'use strict';
	angular.module('Loft.User',[
		]).
	controller('UserCtrl',userController);

	function userController($routeProvider){
		$routeProvider
		.when('/user',{
			templateUrl : 'app/user/user.html',
			controller : 'UserCtrl',
			controllerAs : 'uc'
		});
	}

})();