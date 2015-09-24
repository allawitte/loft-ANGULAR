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
					'Loft.Users',
					'Loft.User'
					])
					.config(Config)
					.controller('MainCtrl', mainController);

	function mainController($scope){
		$scope.hello = "Hello, world!";

	}

	function Config($routeProvider){
		$routeProvider		
		.otherwise({redirectTo : '/'})
	}
})();