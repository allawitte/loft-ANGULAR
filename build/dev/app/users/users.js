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

