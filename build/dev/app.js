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
		.when('/users',{
			templateUrl : 'app/users/users.html',
			controller : 'UsersCtrl',
			controllerAs : 'usc'
		})
		.when('/user',{
			templateUrl : 'app/user/user.html',
			controller : 'UserCtrl',
			controllerAs : 'uc'
		})
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
	controller('UsersCtrl',usersController);

	function usersController(){
		
	}

})();