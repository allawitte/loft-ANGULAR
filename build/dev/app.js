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
					.run(Run)
					.controller('MainCtrl', mainController);

mainController.$inject = ['$scope'];
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
;(function(){
	'use strict';
	angular.module('Loft.Home',[
		//'ngRoute'
		'ui.router'
		])
		.config(HomeConfig)
		.controller('HomeCtrl',homeController);
	
 homeController.$inject = ['$scope'];
	function homeController($scope){
		
	}
/*
	function UsersConfig($routeProvider){
		$routeProvider
		.when('/users',{
			templateUrl : 'app/users/users.html',
			controller : 'UsersCtrl',
			controllerAs : 'usc'
		});
	}

*/

function HomeConfig($stateProvider){
		$stateProvider
		.state('home',{
			url: '/',
			templateUrl : 'app/home/home.html',
			controller : 'HomeCtrl',
			controllerAs : 'home'
		});
	}
})();

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
	function userController($scope){
		
	}

})();
;(function(){
	'use strict';
	angular.module('Loft.Users',[
		//'ngRoute'
		'ui.router'
		])
		.constant('FIREBASE_URL', "http://........")
		.value('configOptions',{
			lang: 'ru',
			timezone: '-3'
		})
		.config(UsersConfig)
		.controller('UsersCtrl',usersController)
		.run(Run)
		.factory('UsersFactory', UsersFactory);

		function UsersFactory(){
			var obj = {};
			var Private = null;

			obj.val = 'Some value';

			obj.getPrivate = function(){
				return Private
			}
			obj.setPrivate = function(_private){
				Private = _private;
			}

			return obj;
		}
	
 usersController.$inject = ['$scope'];

	function usersController(UsersFactory){
		//$scope.name = "users";

		this.usersList = [{
			name : "Alla",
			email : "alla@inbox.com"

		}];

		this.addUser = function(user){
			this.usersList.push(user);
		};

		console.log(UsersFactory);

		this.hello = UsersFactory.getPrivate();
		console.log(hello);
		
	}
/*
	function UsersConfig($routeProvider){
		$routeProvider
		.when('/users',{
			templateUrl : 'app/users/users.html',
			controller : 'UsersCtrl',
			controllerAs : 'usc'
		});
	}

*/
function UsersConfig($stateProvider){
		$stateProvider
		.state('users',{
			url: '/users',
			templateUrl : 'app/users/users.html',
			controller : 'UsersCtrl',
			controllerAs : 'usc'
		});
	}

function Run(FIREBASE_URL, configOptions, UsersFactory){
	console.log('====== Run Users ============');
	//console.log(FIREBASE_URL);
	//console.log(configOptions);
	UsersFactory.setPrivate('Hello guys!');
}

})();

