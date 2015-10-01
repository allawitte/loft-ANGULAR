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
;(function(){
	'use strict';
	angular.module('Loft.Home',[
		//'ngRoute'
		'ui.router'
		])
		.config(HomeConfig)
		.controller('HomeCtrl',homeController);
	
 	//ngInject
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
	//ngInject
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
		.factory('UsersFactory', UsersFactory)
		.service('UsersService', UsersService)
		.provider('UsersProv', UsersProvider);

		function UsersFactory(){
			var obj = {};
			var Private = null;

			obj.val = 'Some value';

			obj.getPrivate = function(){
				return Private;
			};
			obj.setPrivate = function(_private){
				Private = _private;
			};

			return obj;
		};

		function UsersService(){
			var Private = null;

			this.val = 'Some value';

			this.getPrivate = function(){
				return Private;
			};
			this.setPrivate = function(_private){
				Private = _private;
			};

			
		};

		function UsersProvider(){
			var privateVal = "Private";
			return {
				setPrivate: function(_privateVal){
					privateVal = _privateVal;
				},
				$get: function(){
					
						var obj = {};

						obj.getPrivate = function(){
						 return privateVal;
						}
						return obj;
					

				}//end of $get
			}//end of 1-st return
		};
		//ngInject

		function Run(FIREBASE_URL, configOptions, UsersFactory, UsersService, UsersProv){
			console.log('====== Run Users ============');
			//console.log(FIREBASE_URL);
			//console.log(configOptions);
			UsersService.setPrivate("SingletoneService");
			console.log("UsersService.Private", UsersService.getPrivate());
			UsersFactory.setPrivate('Hello guys!');
			console.log("Provider private", UsersProv.getPrivate());
		};
	
 	//ngInject

	function usersController(UsersFactory, UsersService, $rootScope, $scope){
		//$scope.name = "users";
		console.log("============  Users Controller  ================");
		this.usersList = [{
			name : "Alla",
			email : "alla@inbox.com"

		}];



		this.hello = UsersFactory.getPrivate();
		console.log(this.hello);

		console.log("UsersService.Private", UsersService.getPrivate());

		this.addUser = function(user){
			this.usersList.push(user);
		};

		
		
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
//ngInject
function UsersConfig($stateProvider, UsersProvider){
		$stateProvider
		.state('users',{
			url: '/users',
			templateUrl : 'app/users/users.html',
			controller : 'UsersCtrl',
			controllerAs : 'usc'
		});
		UsersProvider.setPrivate("Not almost private");
	}



})();

