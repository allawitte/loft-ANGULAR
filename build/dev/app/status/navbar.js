;(function(){
	'use strict';
	angular.module('Loft.Navbar',[
		])
	.controller('NavbarCtrl', navbarController);
	//ngInject
	function navbarController(Authification){
		console.log("===== NavbarCtrl ======");
		var self = this;
		self.logOut = function(){
			console.log("====  Logout  =====");
			Authification.onAuth();
			Authification.getAuth();
		}

	}
})();	