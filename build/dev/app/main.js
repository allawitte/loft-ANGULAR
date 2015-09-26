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
					//'ngRoute',
					'ui.router',
					'Loft.Users',
					'Loft.User',
					'Loft.Home'
					])
					.config(Config)
					.controller('MainCtrl', mainController);

mainController.$inject = ['$scope'];
	function mainController($scope){
		

	}
/*
	function Config($routeProvider){
		$routeProvider		
		.otherwise({redirectTo : '/'})
	}
*/

function Config($urlRouterProvider){
		$urlRouterProvider		
		.otherwise('/')
	}

})();