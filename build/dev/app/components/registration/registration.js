;(function(){
	'use strict';

	angular.module('Loft.Auth', [
		'Loft.Fire'
		])
	.factory('Authification', AuthificationFactory);
//ngInject
	function  AuthificationFactory(dbc, $firebaseAuth){
		var obj = {};

		//var reference = new Firebase(FIREBASE_URL);

		//obj.getRef = function(){
		//	return reference;
		//};

		

		return obj;

	}//end of factory
})();