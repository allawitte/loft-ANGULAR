;(function(){
	'use strict';
	angular.module('Loft.User',[
		'ui.router',
		'ui.bootstrap'
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
	function userController($scope, $q, UsersRepository){
		console.log('=================   UserController =================');
		//Mother
		var self = this;

		

		//seds kids to the shops

		function sonGo2Shop(){
			var deffered = $q.defer();
			
			setTimeout(function(){
				deffered.notify('Son went to the shop');
				setTimeout(function(){
					if(parseInt(Math.random()*5)%2)
						deffered.resolve("sossege is in the basket");
					else
						deffered.reject('no sossege');
				},400);
			}, 1500);


			return deffered.promise;
		}//end of sonGo2Shop

		function daughterGo2Shop(){
			var deffered = $q.defer();
			
			setTimeout(function(){
				deffered.notify('Doughter went to the farmer');
				setTimeout(function(){
					if(parseInt(Math.random()*5)%2)
						deffered.resolve("eggs is in the basket");
					else
						deffered.reject('no eggs');
				},500);
			}, 2500);


			return deffered.promise;
		}//end of doughterGo2Shop


		self.promiseTest = function(){
			$q.all([sonGo2Shop(), daughterGo2Shop()])//этот метод следит за тем, что либо все элементы массива кончаются успешно, либо все закончились неудачно и тогда запускаются определенные события
			.then(
				//resolve
				function(data){			
				console.log('After children resolved', data);
				},
				//reject
				function(data){
					console.log('After schildren rejected', data);
				},
				//notify
				function(data){
					console.log('Notify children ', data);
				}
				);

			//as soon they are back - she starts to coock some salad

		}//end of promiseTest

		/*================   firebase part  ===================*/
		var users = UsersRepository.getAllUsers();
		users.$loaded(function(_userslist){
		//здесь происходит обработка промиса $loaded

			self.list = _userslist;
			
		});//end of $loaded

		users.$watch(function(_userslist){
			self.list = _userslist;
		});
	}//end of controller

})();