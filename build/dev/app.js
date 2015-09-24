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
;(function(){
	'use strict';
	angular.module('Loft.User',[
		]).
	controller('UserCtrl',userController);

	function userController(){
		
	}

})();
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