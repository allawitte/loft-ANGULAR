;(function(){
	'use strict';

	angular.module('Loft.Users.Repository',[
		'Loft.Fire'
		])
	.factory('UsersRepository', UsersRepositoryFactory);
	//ngInject
	function UsersRepositoryFactory(dbc){
		var obj = {};

		obj.getAllUsers = function(){
			var ref = dbc.getRef();

			//var refUsers = ref.child('users'); //установление соединения  объектом users

			return $firebaseArray(ref.child('users'));// получение массива объектов users 
		}
		return obj;
	}
})