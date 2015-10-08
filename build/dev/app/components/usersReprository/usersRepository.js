;(function(){
	'use strict';

	angular.module('Loft.Users.Repository',[
		'Loft.Fire'
		])
	.factory('UsersRepository', UsersRepositoryFactory);
	//ngInject
	function UsersRepositoryFactory(dbc, $firebaseArray, $firebaseObject){
		console.log("================  Loft.Users.Repository  =================");
		var obj = {};

		obj.getAllUsers = function(){
			var ref = dbc.getRef();

			//var refUsers = ref.child('users'); //установление соединения  объектом users

			return $firebaseArray(ref.child('users'));// получение массива объектов users 
		}//end getAllUsers

		obj.addNewUser = function(_user){
			if(_user && _user.name && _user.name.length > 0){
				console.log('Add New User');
				var ref = dbc.getRef();
				var usersList = $firebaseArray(ref.child('users'));
				return usersList.$add(_user);
			}
			return false;
		}//end addUser

		obj.removeUser = function(_$id){
			console.log("=========== UsersRepository remove User =================");
			if(_$id){
				console.log("=========== UsersRepository remove User =================");
				var ref = dbc.getRef();
				 var usersObject = $firebaseObject(ref.child('users').child(_$id));
				return usersObject.$remove();
			}

		}//end of removeUser

		return obj;
	}
})();