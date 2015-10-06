;(function(){
	'use strict';

	angular.module('Loft.Fire',[
		'firebase'
		])
	.factory('dbc', dbcFactory);

	function dbcFactory(FIREBASE_URL, $firebaseAuth){
		var obj = {};

		var reference = new Firebase(FIREBASE_URL);

		obj.getRef = function(){
			return reefrence;
		}

		return obj;

	}
})