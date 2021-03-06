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
					'Loft.Auth',
					'ui.bootstrap',
					'Loft.Home',
					'Loft.Navbar',
					'Loft.Sign',
					'Loft.Profile'
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

function Run(FIREBASE_URL, configOptions, $rootScope){
	console.log('Run Main');
	console.log(FIREBASE_URL);
	console.log(configOptions);
	$rootScope.currentUser = {
		fullname : null
	};
	$rootScope.alerts = [ ];
	$rootScope.addAlert = function(_msg, _type) {
		_type = _type || 'warning';
    	$rootScope.alerts.push({type: _type, msg: _msg});
  };

  $rootScope.closeAlert = function(index) {
    $rootScope.alerts.splice(index, 1);
  };
}

})();
