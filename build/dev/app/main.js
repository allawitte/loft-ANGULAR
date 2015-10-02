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
					'ui.bootstrap',
					'Loft.Home'
					])
					.config(Config)
					.run(Run)
					.controller('MainCtrl', mainController);

	//ngInject
	function mainController($scope){
		$scope.hello = "Hello";

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

function Run(FIREBASE_URL, configOptions){
	console.log('Run Main');
	console.log(FIREBASE_URL);
	console.log(configOptions);
}

})();