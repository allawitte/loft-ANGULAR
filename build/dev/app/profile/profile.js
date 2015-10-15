;(function(){
	'use strict';
	angular.module('Loft.Profile',[
		])
	.controller('ProfileCtrl', ProfileController)
	.config(ProfileConfig);
	
	/*
	*** Profile  Controller
	*/
	
	
	//ngInject
	function ProfileController(){
		var self = this;
		
	}

	function ProfileConfig($stateProvider){
		$stateProvider
		.state('profile', {
			url: '/profile/:id',
			templateUrl : 'app/profile/profile.html',
			controller : 'ProfileCtrl',
			controllerAs : 'pc'
		});
	}
})();
	