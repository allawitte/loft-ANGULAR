;(function(){
	'use strict';

	/*== эти все записи являются равноценными
	var app =angular
				.module('Loft',[
					'ngRoute'
					]);
	app.controller('NameCtrl',[$scope, function($scope){
	
		}]);

	angular.module('Loft').controller('NameCtrl',[$scope, function($scope){
	
		}]);
*/
	angular.module('Loft',[
					'ngRoute',
					'UsersCtrl',
					'UserCtrl'
					])
					.config(Config)
					.controller('MainCtrl', mainController)

	function mainController($scope){
		$scope.hello = "Hello, world!";
	}

	function Config($routeProvider){
		$routeProvider
		.when('/users',{
			templateUrl : 'app/users/users.html',
			controller : 'UsersCtrl',
			controllerAs : 'usc'
		})
		.when('/user/:id',{
			templateUrl : 'app/user/user.html',
			controller : 'UserCtrl',
			controllerAs : 'uc'
		})
		.otherwise({redirectTo : '/'})
	}
})();