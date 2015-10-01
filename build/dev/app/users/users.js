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

