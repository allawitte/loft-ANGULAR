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
					'Loft.Auth',
					'ui.bootstrap',
					'Loft.Home',
					'Loft.Navbar',
					'Loft.Sign',
					'Loft.Profile'
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

function Run(FIREBASE_URL, configOptions, $rootScope){
	console.log('Run Main');
	console.log(FIREBASE_URL);
	console.log(configOptions);
	$rootScope.currentUser = {
		fullname : null
	};
	$rootScope.alerts = [ ];
	$rootScope.addAlert = function(_msg, _type) {
		_type = _type || 'warning';
    	$rootScope.alerts.push({type: _type, msg: _msg});
  };

  $rootScope.closeAlert = function(index) {
    $rootScope.alerts.splice(index, 1);
  };
}

})();

;(function(){
	'use strict';
	angular.module('Loft.Home',[
		//'ngRoute'
		'ui.router',
		'ui.bootstrap'
		])
		.config(HomeConfig)
		.controller('HomeCtrl',homeController);
	
 	//ngInject
	function homeController($scope, Authentication, $state){

		var self = this;
		self.createUser = {
			email : "",
			password : ""
		};
		$scope.createUse = true;
		self.userLogin = false;
		Authentication.getAuth();
		//Authentication.onAuth();

		self.addUser = function(_user){
			Authentication.createUser(_user);
			$state.go('users');
		}

		self.changeType = function(_input){
			console.log("==== change type =====");
			$scope.createUse = !(_input);
		}

		self.loginUser = function(_user){
			Authentication.authObj(_user)
			.then(function(authData) {
				  console.log("Logged in as:", authData.uid);
				  self.userLogin = "Logged in as:"+ authData.uid;
				  self.error = false;
				  //Authentication.getAuth();
				  $state.go('users');
				}).catch(function(error) {
					self.userLogin = "Authentication failed:"+ error;
				  console.error("Authentication failed:", error);
				  self.error = true;
				  Authentication.getAuth();
			});
		}

		//Authentication.getAuth();
		//Authentication.onAuth();
		//Authentication.createUser();
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
	
;(function(){
	'use strict';
	angular.module('Loft.Sign',[
		'Loft.Auth'
		])
	.controller('SignInCtrl', SignInController)
	.controller('SignUpCtrl', SignUpController)
	.config(SignUpConfig)
	
	/*
	*** SignUp  Controller
	*/
	//ngInject
	function SignUpController(Authentication, $state, $rootScope){
		var self = this;

		function clean(){
			self.user = {
				email : null,
				password : null,
				fullname : null
			};
		};

		clean();

		self.facebookSignUp = function(){
			console.log("facebookSignIn Loft.Sign");
			Authentication
			.facebookSignUp()
			.then(function(e){
				$state.go('home');
			});
		}

		self.signUp = function(){
		    Authentication
	        .createUser(self.user)
	        .then(function(e){
	          clean();
	          $state.go('home');
	        });
	    
		};


	}//end of SignUpController
	/*
	*** SignIn  Controller
	*/
	//ngInject
	function SignInController(Authentication, $state, $rootScope){
		var self = this;

		function clean(){
			self.user = {
				email : null,
				password : null				
			};
		};

		clean();

		self.facebookSignIn = function(){
			console.log("facebookSignUp Loft.Sign");
			Authentication
			.facebookSignIn()
			.then(function(e){
				$state.go('home');
			});
		}

		self.signIn = function(){
			Authentication
	        .login(self.user)
	        .then(function(e){
	          clean();
	          $state.go('home');
	        })
	        .catch(function(error){
          switch (error.code) {
            case "INVALID_EMAIL":
              $rootScope.addAlert('The specified user account email is invalid.');
              console.log("The specified user account email is invalid.");
              break;
            case "INVALID_PASSWORD":
              console.log("The specified user account password is incorrect.");
              break;
            case "INVALID_USER":
              $rootScope.addAlert('The specified user account does not exist.');
              console.log("The specified user account does not exist.");
              break;
            default:
              $rootScope.addAlert('Error logging user in');
              console.log("Error logging user in:", error);
          }
        });
		};
	}//end of SignInController

	//ngInject
	function SignUpConfig($stateProvider){
		$stateProvider
		.state('signin',{
			url: '/signin',
			templateUrl : 'app/sign/sign-in.html',
			controller : 'SignInCtrl',
			controllerAs : 'sic'
		})
		.state('signup',{
			url: '/signup',
			templateUrl : 'app/sign/sign-up.html',
			controller : 'SignUpCtrl',
			controllerAs : 'suc'
		});
	}
	
})();	
;(function(){
	'use strict';
	angular.module('Loft.Navbar',[
		])
	.controller('NavbarCtrl', navbarController);
	//ngInject
	function navbarController(Authentication){
		console.log("===== NavbarCtrl ======");
		var self = this;
		self.logOut = function(){
			console.log("====  Logout  =====");
			Authentication.logoff();			
		}

	}
})();	
;(function(){
	'use strict';
	angular.module('Loft.User',[
		'ui.router',
		'ui.bootstrap',
		'Loft.Users.Repository'
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
	function userController($scope, $q, UsersRepository, $rootScope){
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

		self.newUser = {
			name : "",
			surname : ""
		}

		self.addUser = function(){
			console.log("=============  addUser Controller  =============");
			UsersRepository
			.addNewUser(self.newUser)
			.then(function(ref){
				$rootScope.addAlert('success', 'User was saved succesfully in DB');
			});
			self.newUser = {
				name : "",
				surname : ""
			};
		}//end of addUser

		self.removeUser = function(_$id){
			UsersRepository
			.removeUser(_$id)
			.then(function(){
				$rootScope.addAlert('success', 'User was remover succesfully from DB');
			});

		}//end of removeUser

		var users = UsersRepository.getAllUsers();
		users.$loaded(function(_userslist){
		//здесь происходит обработка промиса $loaded

			self.list = _userslist;
			
		});//end of $loaded
/*
		users.$watch(function(_userslist){
			self.list = _userslist;
		});//end of watch

*/
	}//end of controller

})();
;(function(){
	'use strict';
	angular.module('Loft.Users',[
		//'ngRoute'
		'ui.router',
		'ui.bootstrap'
		])
		.constant('FIREBASE_URL', "http://awfitness.firebaseio.com")
		.value('configOptions',{
			lang: 'ru',
			timezone: '-3'
		})
		.provider('UsersProv', UsersProvider)
		.config(UsersConfig)
		.controller('UsersCtrl', usersController)
		.filter('EyeColor', EyeColorFilter)
		.filter('Ruble', RubleFilter)
		.run(Run)
		.factory('UsersFactory', UsersFactory)
		.service('UsersService', UsersService);
		

		function UsersFactory($log, $filter){
			var obj = {};
			/*
			$log.log("UsersFactory Init");
			$log.info("UsersFactory Init");
			$log.warn("UsersFactory Init");
			$log.error("UsersFactory Init");
			$log.debug("UsersFactory Init");
			*/
			var Private = null;

			obj.val = 'Some value';
			obj.usersList = [
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Tran Simon", 
							    "gender": "male", 
							    "age": 30, 
							    "email": "transimon@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1243185300.0000001, 
							    "id": "56066aa99c1d3a2cca792504"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Melva Green", 
							    "gender": "female", 
							    "age": 25, 
							    "email": "melvagreen@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 337273509.99999999, 
							    "id": "56066aa9ce7855172c4d41f9"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Rivers Foreman", 
							    "gender": "male", 
							    "age": 24, 
							    "email": "riversforeman@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 38697595.000000001, 
							    "id": "56066aa9a9c3db3f10763aac"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Dominique Joseph", 
							    "gender": "female", 
							    "age": 37, 
							    "email": "dominiquejoseph@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1902478.2, 
							    "id": "56066aa903dd0f0c8457d62a"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Letitia Donaldson", 
							    "gender": "female", 
							    "age": 39, 
							    "email": "letitiadonaldson@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3886.8443000000002, 
							    "id": "56066aa99febb63c62dc02b1"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Anderson Gross", 
							    "gender": "male", 
							    "age": 28, 
							    "email": "andersongross@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2783.9481000000001, 
							    "id": "56066aa9eb14e0393de4e918"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Dalton Dejesus", 
							    "gender": "male", 
							    "age": 27, 
							    "email": "daltondejesus@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3306.5686999999998, 
							    "id": "56066aa9b81a0d7b79dcda45"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Cora Mccormick", 
							    "gender": "female", 
							    "age": 32, 
							    "email": "coramccormick@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2035.2275, 
							    "id": "56066aa99901bca44ea3e707"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Underwood Shannon", 
							    "gender": "male", 
							    "age": 36, 
							    "email": "underwoodshannon@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2976.8371000000002, 
							    "id": "56066aa9bf144edfd966589b"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Beasley Stuart", 
							    "gender": "male", 
							    "age": 28, 
							    "email": "beasleystuart@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2171.1179999999999, 
							    "id": "56066aa9d211315cac783365"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Shari Miranda", 
							    "gender": "female", 
							    "age": 32, 
							    "email": "sharimiranda@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3973.2687999999998, 
							    "id": "56066aa98ad3e64d9e1aae7e"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Elvira Webster", 
							    "gender": "female", 
							    "age": 24, 
							    "email": "elvirawebster@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3019.4857999999999, 
							    "id": "56066aa9a82c01cdf20c51aa"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Lacy Bonner", 
							    "gender": "female", 
							    "age": 37, 
							    "email": "lacybonner@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3449.3910999999998, 
							    "id": "56066aa96e9adabced1005fb"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Kerri Frank", 
							    "gender": "female", 
							    "age": 22, 
							    "email": "kerrifrank@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1369.4061999999999, 
							    "id": "56066aa98d0b90542ee1716a"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Young Woodward", 
							    "gender": "female", 
							    "age": 35, 
							    "email": "youngwoodward@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2790.2817, 
							    "id": "56066aa9f5f27b06a65aea4d"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Contreras Chambers", 
							    "gender": "male", 
							    "age": 39, 
							    "email": "contreraschambers@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2427.6203999999998, 
							    "id": "56066aa98635505d287a9cda"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Holloway Hinton", 
							    "gender": "male", 
							    "age": 20, 
							    "email": "hollowayhinton@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1413.6674, 
							    "id": "56066aa92bdfff32f1306da3"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Gonzales Schmidt", 
							    "gender": "male", 
							    "age": 40, 
							    "email": "gonzalesschmidt@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1855.2081000000001, 
							    "id": "56066aa981f83e11263d2f8d"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Joyce Mcmillan", 
							    "gender": "female", 
							    "age": 21, 
							    "email": "joycemcmillan@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2379.2276999999999, 
							    "id": "56066aa9290544a694f3c107"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Silvia Luna", 
							    "gender": "female", 
							    "age": 33, 
							    "email": "silvialuna@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3845.2175000000002, 
							    "id": "56066aa9b60ebe1756928933"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Lenora Snider", 
							    "gender": "female", 
							    "age": 35, 
							    "email": "lenorasnider@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1977.4902999999999, 
							    "id": "56066aa980d11e54ca1c476b"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Gladys Mcfadden", 
							    "gender": "female", 
							    "age": 25, 
							    "email": "gladysmcfadden@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3139.4515999999999, 
							    "id": "56066aa91aa9f56a7a00cc09"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Lila Cardenas", 
							    "gender": "female", 
							    "age": 39, 
							    "email": "lilacardenas@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2194.8353999999999, 
							    "id": "56066aa911ce679453d28b06"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Trujillo Douglas", 
							    "gender": "male", 
							    "age": 31, 
							    "email": "trujillodouglas@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2546.0315999999998, 
							    "id": "56066aa9e7996a62ceb2a852"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Faith Carroll", 
							    "gender": "female", 
							    "age": 37, 
							    "email": "faithcarroll@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3682.6338999999998, 
							    "id": "56066aa996ee85b1b2fcda7d"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Ella Logan", 
							    "gender": "female", 
							    "age": 22, 
							    "email": "ellalogan@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1604.819, 
							    "id": "56066aa964098eff55b8063f"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Rita Cortez", 
							    "gender": "female", 
							    "age": 37, 
							    "email": "ritacortez@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2676.5387999999998, 
							    "id": "56066aa957e2f757e0fa5af0"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Cain Scott", 
							    "gender": "male", 
							    "age": 27, 
							    "email": "cainscott@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2040.4943000000001, 
							    "id": "56066aa9b2512a0b5396e0dd"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Cote Haynes", 
							    "gender": "male", 
							    "age": 38, 
							    "email": "cotehaynes@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1599.971, 
							    "id": "56066aa9775ebd8e3b8cb6db"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Ellison Mullins", 
							    "gender": "male", 
							    "age": 39, 
							    "email": "ellisonmullins@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1523.1201000000001, 
							    "id": "56066aa91c7e7abcd6430dda"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Edith Ferrell", 
							    "gender": "female", 
							    "age": 24, 
							    "email": "edithferrell@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2537.4603000000002, 
							    "id": "56066aa9b697b4300917af5b"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Simon Snow", 
							    "gender": "male", 
							    "age": 30, 
							    "email": "simonsnow@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2777.9829, 
							    "id": "56066aa9725f5e2b4588e2e0"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Ester Patton", 
							    "gender": "female", 
							    "age": 38, 
							    "email": "esterpatton@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3099.6651000000002, 
							    "id": "56066aa9cfafd3dbe6121076"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Rosemary Pate", 
							    "gender": "female", 
							    "age": 30, 
							    "email": "rosemarypate@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3345.3155000000002, 
							    "id": "56066aa9d257149d0160f8fb"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Velazquez Holloway", 
							    "gender": "male", 
							    "age": 28, 
							    "email": "velazquezholloway@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2456.8011000000001, 
							    "id": "56066aa901faeeb4438a2d06"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Knapp Gordon", 
							    "gender": "male", 
							    "age": 29, 
							    "email": "knappgordon@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3580.4553999999998, 
							    "id": "56066aa94de0143d16ecb28a"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Mason Nguyen", 
							    "gender": "male", 
							    "age": 24, 
							    "email": "masonnguyen@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3608.1867000000002, 
							    "id": "56066aa90d73c9f60a13241a"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Weaver Jennings", 
							    "gender": "male", 
							    "age": 37, 
							    "email": "weaverjennings@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2568.5218, 
							    "id": "56066aa9f318afa1c197bd2e"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Silva Patrick", 
							    "gender": "male", 
							    "age": 37, 
							    "email": "silvapatrick@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3706.7856000000002, 
							    "id": "56066aa997d50f7de1161c3d"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Navarro Reyes", 
							    "gender": "male", 
							    "age": 21, 
							    "email": "navarroreyes@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2032.6130000000001, 
							    "id": "56066aa9bbf0aee9e36ea16f"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Lola Wilkinson", 
							    "gender": "female", 
							    "age": 31, 
							    "email": "lolawilkinson@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3297.9486000000002, 
							    "id": "56066aa9aa744037185579e0"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Mayra Lamb", 
							    "gender": "female", 
							    "age": 28, 
							    "email": "mayralamb@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3471.6244999999999, 
							    "id": "56066aa9129c2cf09659a965"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Lucinda Buckner", 
							    "gender": "female", 
							    "age": 23, 
							    "email": "lucindabuckner@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2127.1282999999999, 
							    "id": "56066aa9387bfcf48a92489d"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Janette Rosales", 
							    "gender": "female", 
							    "age": 29, 
							    "email": "janetterosales@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1726.3339000000001, 
							    "id": "56066aa9d9337f6e55de61bb"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Bell Franks", 
							    "gender": "male", 
							    "age": 29, 
							    "email": "bellfranks@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3516.1902, 
							    "id": "56066aa9a92f226978eafa48"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Arline Rowland", 
							    "gender": "female", 
							    "age": 38, 
							    "email": "arlinerowland@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3910.2919000000002, 
							    "id": "56066aa9df137f0678e8ece5"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Pam Galloway", 
							    "gender": "female", 
							    "age": 24, 
							    "email": "pamgalloway@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2298.8800000000001, 
							    "id": "56066aa90a2934b23ba236d4"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Amalia Frazier", 
							    "gender": "female", 
							    "age": 20, 
							    "email": "amaliafrazier@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2247.7687000000001, 
							    "id": "56066aa9695f006c5b2cbf59"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Jacobs Lawson", 
							    "gender": "male", 
							    "age": 24, 
							    "email": "jacobslawson@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1912.8432, 
							    "id": "56066aa93793b9047ec6f847"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Luann Matthews", 
							    "gender": "female", 
							    "age": 32, 
							    "email": "luannmatthews@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2425.0270999999998, 
							    "id": "56066aa90e132b439eedf70d"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Marsh Newman", 
							    "gender": "male", 
							    "age": 27, 
							    "email": "marshnewman@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1684.9163000000001, 
							    "id": "56066aa916103aa13f178063"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Adrian Ray", 
							    "gender": "female", 
							    "age": 33, 
							    "email": "adrianray@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3144.0707000000002, 
							    "id": "56066aa9f743e1143fcec892"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Dean Brown", 
							    "gender": "male", 
							    "age": 37, 
							    "email": "deanbrown@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1169.8484000000001, 
							    "id": "56066aa979394c49f45d1d49"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Hammond Potter", 
							    "gender": "male", 
							    "age": 27, 
							    "email": "hammondpotter@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1581.6005, 
							    "id": "56066aa98830a1c142a17280"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Chapman Harrell", 
							    "gender": "male", 
							    "age": 34, 
							    "email": "chapmanharrell@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1440.7114999999999, 
							    "id": "56066aa993713b553ede2879"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Nell Mckinney", 
							    "gender": "female", 
							    "age": 32, 
							    "email": "nellmckinney@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1461.6764000000001, 
							    "id": "56066aa934969cfdc847d172"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Scott Workman", 
							    "gender": "male", 
							    "age": 34, 
							    "email": "scottworkman@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2812.5961000000002, 
							    "id": "56066aa902e99cf925f437fc"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Stein Elliott", 
							    "gender": "male", 
							    "age": 40, 
							    "email": "steinelliott@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3117.6469999999999, 
							    "id": "56066aa9c5de671df21d4906"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Bernadine Brooks", 
							    "gender": "female", 
							    "age": 39, 
							    "email": "bernadinebrooks@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3023.1181999999999, 
							    "id": "56066aa935295602684becfa"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Conway Michael", 
							    "gender": "male", 
							    "age": 28, 
							    "email": "conwaymichael@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3121.7312000000002, 
							    "id": "56066aa948fd656906408a52"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Daugherty Jordan", 
							    "gender": "male", 
							    "age": 22, 
							    "email": "daughertyjordan@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1355.5541000000001, 
							    "id": "56066aa9e066b9fd54f4d88f"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Wilkinson Petersen", 
							    "gender": "male", 
							    "age": 28, 
							    "email": "wilkinsonpetersen@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3168.3047000000001, 
							    "id": "56066aa9a82ae5b45b808f00"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Bradley Mooney", 
							    "gender": "male", 
							    "age": 33, 
							    "email": "bradleymooney@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2034.3689999999999, 
							    "id": "56066aa9bc4f5d7f7fd48655"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Liza Martinez", 
							    "gender": "female", 
							    "age": 20, 
							    "email": "lizamartinez@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3714.1498000000001, 
							    "id": "56066aa9844f77bd47234d08"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Camille Salas", 
							    "gender": "female", 
							    "age": 29, 
							    "email": "camillesalas@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2399.0668000000001, 
							    "id": "56066aa90e3820f326513404"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Grace Warren", 
							    "gender": "female", 
							    "age": 36, 
							    "email": "gracewarren@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2989.3087, 
							    "id": "56066aa9728486849a9c2085"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Cohen Anthony", 
							    "gender": "male", 
							    "age": 23, 
							    "email": "cohenanthony@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2927.2773999999999, 
							    "id": "56066aa9e42bdabc232e1bde"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Edwards Rollins", 
							    "gender": "male", 
							    "age": 35, 
							    "email": "edwardsrollins@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1027.0537999999999, 
							    "id": "56066aa943b9d6cce81309e7"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Goodman Landry", 
							    "gender": "male", 
							    "age": 27, 
							    "email": "goodmanlandry@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1999.5274999999999, 
							    "id": "56066aa970d1e7031c18bb5c"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Simone Sweet", 
							    "gender": "female", 
							    "age": 21, 
							    "email": "simonesweet@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2510.8319999999999, 
							    "id": "56066aa9921ded8b007d3888"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Wilcox Collier", 
							    "gender": "male", 
							    "age": 27, 
							    "email": "wilcoxcollier@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1482.9016999999999, 
							    "id": "56066aa934705d7cbbb179ea"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Pratt Roman", 
							    "gender": "male", 
							    "age": 21, 
							    "email": "prattroman@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1440.1116, 
							    "id": "56066aa910c7bfcb54f3ded6"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Newman Burt", 
							    "gender": "male", 
							    "age": 21, 
							    "email": "newmanburt@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3531.9765000000002, 
							    "id": "56066aa951dbaa3d3de6ab88"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Obrien Walton", 
							    "gender": "male", 
							    "age": 40, 
							    "email": "obrienwalton@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1253.9068, 
							    "id": "56066aa9e80ce8376cff80e9"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Michele Delgado", 
							    "gender": "female", 
							    "age": 22, 
							    "email": "micheledelgado@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3116.4938999999999, 
							    "id": "56066aa9a6a5f36abcffb226"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Olsen Becker", 
							    "gender": "male", 
							    "age": 35, 
							    "email": "olsenbecker@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1005.0952, 
							    "id": "56066aa9165ca9542b95b9dc"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Alyson Mcconnell", 
							    "gender": "female", 
							    "age": 20, 
							    "email": "alysonmcconnell@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2054.5558000000001, 
							    "id": "56066aa981da8c0137e6e3da"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Lina Patel", 
							    "gender": "female", 
							    "age": 37, 
							    "email": "linapatel@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3410.2773000000002, 
							    "id": "56066aa92a4f9c13edac0d2a"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Serrano Maxwell", 
							    "gender": "male", 
							    "age": 20, 
							    "email": "serranomaxwell@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2024.4367999999999, 
							    "id": "56066aa916edbfd7c0c8451a"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Sosa Merritt", 
							    "gender": "male", 
							    "age": 36, 
							    "email": "sosamerritt@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2783.8371999999999, 
							    "id": "56066aa9547dae55e180de15"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Oneal Daugherty", 
							    "gender": "male", 
							    "age": 28, 
							    "email": "onealdaugherty@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2995.4038999999998, 
							    "id": "56066aa9ff7175d863ae9e84"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Dionne Oneill", 
							    "gender": "female", 
							    "age": 33, 
							    "email": "dionneoneill@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3540.8906000000002, 
							    "id": "56066aa900505317b6b27903"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Gina Waller", 
							    "gender": "female", 
							    "age": 26, 
							    "email": "ginawaller@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3693.7359999999999, 
							    "id": "56066aa9332d3b394d6fa885"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Araceli Johnston", 
							    "gender": "female", 
							    "age": 36, 
							    "email": "aracelijohnston@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3783.3072999999999, 
							    "id": "56066aa90b1795addb0c2c09"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Antonia Kramer", 
							    "gender": "female", 
							    "age": 34, 
							    "email": "antoniakramer@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1290.2769000000001, 
							    "id": "56066aa90ad4424472cad2b9"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Boyer Parrish", 
							    "gender": "male", 
							    "age": 27, 
							    "email": "boyerparrish@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2501.9029999999998, 
							    "id": "56066aa920864ca4e0d59834"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Rush Ferguson", 
							    "gender": "male", 
							    "age": 33, 
							    "email": "rushferguson@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3666.1552000000001, 
							    "id": "56066aa95f31dcc728926b24"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Sexton Harris", 
							    "gender": "male", 
							    "age": 22, 
							    "email": "sextonharris@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3652.2519000000002, 
							    "id": "56066aa93e6d6e5caeb77999"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Olson Beard", 
							    "gender": "male", 
							    "age": 32, 
							    "email": "olsonbeard@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3720.5738999999999, 
							    "id": "56066aa9d2845774a44f943a"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Clements Sandoval", 
							    "gender": "male", 
							    "age": 28, 
							    "email": "clementssandoval@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1583.4580000000001, 
							    "id": "56066aa969e7e4447aeb6ed3"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Imelda Maldonado", 
							    "gender": "female", 
							    "age": 32, 
							    "email": "imeldamaldonado@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2643.3411000000001, 
							    "id": "56066aa9c031ca46ca4407ab"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Dickson Mann", 
							    "gender": "male", 
							    "age": 31, 
							    "email": "dicksonmann@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1716.8988999999999, 
							    "id": "56066aa9cf414f02e72bff7e"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Felicia Sawyer", 
							    "gender": "female", 
							    "age": 21, 
							    "email": "feliciasawyer@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1539.2908, 
							    "id": "56066aa97f5bbae53efe8b2c"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Travis Gay", 
							    "gender": "male", 
							    "age": 29, 
							    "email": "travisgay@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3644.1799000000001, 
							    "id": "56066aa943fce94c58d1797b"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Lowery Lawrence", 
							    "gender": "male", 
							    "age": 31, 
							    "email": "lowerylawrence@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2325.7037999999998, 
							    "id": "56066aa9488961ffb1ee0e8b"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Aline Sears", 
							    "gender": "female", 
							    "age": 33, 
							    "email": "alinesears@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2639.6750999999999, 
							    "id": "56066aa928431a326a0f5d3e"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Alana Taylor", 
							    "gender": "female", 
							    "age": 28, 
							    "email": "alanataylor@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1738.9828, 
							    "id": "56066aa9a95fe9bffd4e826b"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Mathews Vasquez", 
							    "gender": "male", 
							    "age": 24, 
							    "email": "mathewsvasquez@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2550.4856, 
							    "id": "56066aa97eb3baa96ffc0353"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Higgins Tucker", 
							    "gender": "male", 
							    "age": 22, 
							    "email": "higginstucker@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1988.0051000000001, 
							    "id": "56066aa9ff2414b8d0a8159f"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Selma Bird", 
							    "gender": "female", 
							    "age": 29, 
							    "email": "selmabird@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3924.8447999999999, 
							    "id": "56066aa96b0ac0b79398f93b"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Alba Bradley", 
							    "gender": "female", 
							    "age": 37, 
							    "email": "albabradley@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3125.9231, 
							    "id": "56066aa92af7f5cce2dfdad9"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Conrad Hampton", 
							    "gender": "male", 
							    "age": 23, 
							    "email": "conradhampton@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2064.2329, 
							    "id": "56066aa9d4637699a696b49e"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Terrie Mckay", 
							    "gender": "female", 
							    "age": 20, 
							    "email": "terriemckay@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3978.6880000000001, 
							    "id": "56066aa99b4f9c6323a9f38e"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Shannon Durham", 
							    "gender": "female", 
							    "age": 25, 
							    "email": "shannondurham@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3187.3973000000001, 
							    "id": "56066aa98c9f60b4dff29736"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Vivian Valenzuela", 
							    "gender": "female", 
							    "age": 25, 
							    "email": "vivianvalenzuela@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3791.0698000000002, 
							    "id": "56066aa932714d907137ac8a"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Leslie Frye", 
							    "gender": "female", 
							    "age": 20, 
							    "email": "lesliefrye@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2338.9204, 
							    "id": "56066aa93070db5adf4df719"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Gutierrez Marquez", 
							    "gender": "male", 
							    "age": 23, 
							    "email": "gutierrezmarquez@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2842.9976999999999, 
							    "id": "56066aa95222d11e15c993c0"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Solis Montoya", 
							    "gender": "male", 
							    "age": 33, 
							    "email": "solismontoya@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3699.5953, 
							    "id": "56066aa9af615eb2ba343c9d"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Burgess Key", 
							    "gender": "male", 
							    "age": 40, 
							    "email": "burgesskey@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1026.4356, 
							    "id": "56066aa9b6a79b9f32e6db6e"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Franklin Chen", 
							    "gender": "male", 
							    "age": 40, 
							    "email": "franklinchen@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2923.9540999999999, 
							    "id": "56066aa953c0966f9052a838"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Tasha Dean", 
							    "gender": "female", 
							    "age": 21, 
							    "email": "tashadean@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2971.0634, 
							    "id": "56066aa9836428c910e8b096"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Pope Forbes", 
							    "gender": "male", 
							    "age": 34, 
							    "email": "popeforbes@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2663.1743000000001, 
							    "id": "56066aa98809f4dfae37969b"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Schmidt Hendricks", 
							    "gender": "male", 
							    "age": 37, 
							    "email": "schmidthendricks@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3807.2966000000001, 
							    "id": "56066aa94fe4ead64a0988b3"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Krystal Jacobs", 
							    "gender": "female", 
							    "age": 26, 
							    "email": "krystaljacobs@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2442.1831999999999, 
							    "id": "56066aa9b0515171c44e30c3"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Courtney Manning", 
							    "gender": "female", 
							    "age": 31, 
							    "email": "courtneymanning@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3505.2075, 
							    "id": "56066aa99af3b38f6a1c0f0f"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Curtis Dillon", 
							    "gender": "male", 
							    "age": 25, 
							    "email": "curtisdillon@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3329.4897999999998, 
							    "id": "56066aa96f4d49064a49c12a"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Reva Campos", 
							    "gender": "female", 
							    "age": 40, 
							    "email": "revacampos@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3893.2984999999999, 
							    "id": "56066aa9445bd8b2196dc1cf"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Carole Boyer", 
							    "gender": "female", 
							    "age": 40, 
							    "email": "caroleboyer@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3939.1163999999999, 
							    "id": "56066aa98da277790f50cca9"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Bishop Leon", 
							    "gender": "male", 
							    "age": 24, 
							    "email": "bishopleon@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2792.0146, 
							    "id": "56066aa9e4a9161123ea317d"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Kristi Mcintosh", 
							    "gender": "female", 
							    "age": 21, 
							    "email": "kristimcintosh@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2778.6934999999999, 
							    "id": "56066aa90875a2c14183502a"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Carpenter Foster", 
							    "gender": "male", 
							    "age": 25, 
							    "email": "carpenterfoster@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3903.0101, 
							    "id": "56066aa923c7c13e2e04c0de"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Candace Faulkner", 
							    "gender": "female", 
							    "age": 30, 
							    "email": "candacefaulkner@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2165.5003000000002, 
							    "id": "56066aa9613d778292b96f72"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Mendoza Hale", 
							    "gender": "male", 
							    "age": 24, 
							    "email": "mendozahale@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2667.1145000000001, 
							    "id": "56066aa907b34958b18264b2"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Clarke Norman", 
							    "gender": "male", 
							    "age": 27, 
							    "email": "clarkenorman@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1754.3281999999999, 
							    "id": "56066aa9a8ba19abb1787681"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Hardy Le", 
							    "gender": "male", 
							    "age": 36, 
							    "email": "hardyle@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3739.7429000000002, 
							    "id": "56066aa9193a838954f7c605"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Eloise Strong", 
							    "gender": "female", 
							    "age": 37, 
							    "email": "eloisestrong@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2062.5549000000001, 
							    "id": "56066aa932a6d26911c63f36"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Jimenez Garrett", 
							    "gender": "male", 
							    "age": 32, 
							    "email": "jimenezgarrett@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3762.8299000000002, 
							    "id": "56066aa99771e760fa8d014e"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Francisca Mercer", 
							    "gender": "female", 
							    "age": 25, 
							    "email": "franciscamercer@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3845.5039999999999, 
							    "id": "56066aa97f3678edd4fcfea1"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Margie Mason", 
							    "gender": "female", 
							    "age": 26, 
							    "email": "margiemason@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2042.6129000000001, 
							    "id": "56066aa905da65a337d2a57f"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Ursula Casey", 
							    "gender": "female", 
							    "age": 36, 
							    "email": "ursulacasey@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3782.1689000000001, 
							    "id": "56066aa931b3931b610551f4"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Fern Hicks", 
							    "gender": "female", 
							    "age": 25, 
							    "email": "fernhicks@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2046.1474000000001, 
							    "id": "56066aa998f876c56ed88ba2"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Janet Blackwell", 
							    "gender": "female", 
							    "age": 32, 
							    "email": "janetblackwell@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3762.1572999999999, 
							    "id": "56066aa9733f9b5ea9c4ce56"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Hicks Garcia", 
							    "gender": "male", 
							    "age": 38, 
							    "email": "hicksgarcia@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3605.1341000000002, 
							    "id": "56066aa9cbaeb03be5623b40"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Jenny Preston", 
							    "gender": "female", 
							    "age": 40, 
							    "email": "jennypreston@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3574.5192000000002, 
							    "id": "56066aa9ccb5057d57d5f869"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Florine Bell", 
							    "gender": "female", 
							    "age": 27, 
							    "email": "florinebell@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2539.6500999999998, 
							    "id": "56066aa97569b241122e44d5"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Berger Cote", 
							    "gender": "male", 
							    "age": 26, 
							    "email": "bergercote@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2868.4096, 
							    "id": "56066aa92e1abb41fce46cd9"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Paul Sanders", 
							    "gender": "male", 
							    "age": 30, 
							    "email": "paulsanders@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1637.9865, 
							    "id": "56066aa96658426f5ae0e9ab"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Kitty Duncan", 
							    "gender": "female", 
							    "age": 37, 
							    "email": "kittyduncan@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2314.4656, 
							    "id": "56066aa9b705a187480cde98"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Wilda Barker", 
							    "gender": "female", 
							    "age": 31, 
							    "email": "wildabarker@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3237.5248000000001, 
							    "id": "56066aa98a2ef429b5abe9c9"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Stacey Hobbs", 
							    "gender": "female", 
							    "age": 25, 
							    "email": "staceyhobbs@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1434.8015, 
							    "id": "56066aa96e0348a87a4776bb"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Margo Pruitt", 
							    "gender": "female", 
							    "age": 39, 
							    "email": "margopruitt@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3727.7782000000002, 
							    "id": "56066aa9008059e9e699ed62"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Lillie Ayala", 
							    "gender": "female", 
							    "age": 37, 
							    "email": "lillieayala@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2213.0922, 
							    "id": "56066aa9e2c37b9da721464e"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Bridges Dawson", 
							    "gender": "male", 
							    "age": 22, 
							    "email": "bridgesdawson@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1579.2481, 
							    "id": "56066aa9c24f99afe9d10b75"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Bertie Sampson", 
							    "gender": "female", 
							    "age": 35, 
							    "email": "bertiesampson@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1299.9517000000001, 
							    "id": "56066aa9b2802b727186c40b"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Pitts Kelly", 
							    "gender": "male", 
							    "age": 30, 
							    "email": "pittskelly@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2392.8890000000001, 
							    "id": "56066aa930737728ac341c7e"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Walls Rich", 
							    "gender": "male", 
							    "age": 31, 
							    "email": "wallsrich@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3149.6790999999998, 
							    "id": "56066aa9dbb3e27c07e62965"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Warner Chaney", 
							    "gender": "male", 
							    "age": 26, 
							    "email": "warnerchaney@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2756.6286, 
							    "id": "56066aa9f5fd12a1ca866041"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Dotson Knapp", 
							    "gender": "male", 
							    "age": 26, 
							    "email": "dotsonknapp@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2488.3892999999998, 
							    "id": "56066aa9cc6b1f72487c27ca"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Forbes Horne", 
							    "gender": "male", 
							    "age": 33, 
							    "email": "forbeshorne@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1055.9902, 
							    "id": "56066aa96bf72dc9324f7439"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Leta Moses", 
							    "gender": "female", 
							    "age": 27, 
							    "email": "letamoses@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2271.0889000000002, 
							    "id": "56066aa9ea4d2d2ff5d139cb"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Skinner Crane", 
							    "gender": "male", 
							    "age": 20, 
							    "email": "skinnercrane@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3526.7909, 
							    "id": "56066aa9ce86778e3279f399"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Hatfield Kim", 
							    "gender": "male", 
							    "age": 30, 
							    "email": "hatfieldkim@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3000.7058999999999, 
							    "id": "56066aa982004e335cb79c2f"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Muriel Jimenez", 
							    "gender": "female", 
							    "age": 31, 
							    "email": "murieljimenez@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3381.1109000000001, 
							    "id": "56066aa991c27181ee6a5157"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Latonya Arnold", 
							    "gender": "female", 
							    "age": 28, 
							    "email": "latonyaarnold@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2074.6226999999999, 
							    "id": "56066aa9358e0e67b781cb92"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Yates Prince", 
							    "gender": "male", 
							    "age": 20, 
							    "email": "yatesprince@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3620.3054000000002, 
							    "id": "56066aa9bee3acdc97b054d6"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Katrina Houston", 
							    "gender": "female", 
							    "age": 33, 
							    "email": "katrinahouston@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2707.5792000000001, 
							    "id": "56066aa9b20c0616e0085dee"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Roxie Finch", 
							    "gender": "female", 
							    "age": 22, 
							    "email": "roxiefinch@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2646.9339, 
							    "id": "56066aa9b7bb096a988701ae"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Henrietta Anderson", 
							    "gender": "female", 
							    "age": 31, 
							    "email": "henriettaanderson@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1553.8430000000001, 
							    "id": "56066aa960090d92801cf16c"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Alexandra Beasley", 
							    "gender": "female", 
							    "age": 29, 
							    "email": "alexandrabeasley@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1182.9331999999999, 
							    "id": "56066aa9f38ad2ce04a74294"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Tonya Langley", 
							    "gender": "female", 
							    "age": 36, 
							    "email": "tonyalangley@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1434.4060999999999, 
							    "id": "56066aa90eff9626a2f1afbb"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Vega Koch", 
							    "gender": "male", 
							    "age": 32, 
							    "email": "vegakoch@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3555.9863999999998, 
							    "id": "56066aa91612a27606649e9d"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Ward Booker", 
							    "gender": "male", 
							    "age": 32, 
							    "email": "wardbooker@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3104.5972000000002, 
							    "id": "56066aa966a8863e50d1c616"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Lawanda Lott", 
							    "gender": "female", 
							    "age": 33, 
							    "email": "lawandalott@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3737.3625000000002, 
							    "id": "56066aa925730d26c0a3b00e"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Ortiz Yates", 
							    "gender": "male", 
							    "age": 23, 
							    "email": "ortizyates@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2095.3672000000001, 
							    "id": "56066aa9d9346d66aa3fc4fc"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Aurora Porter", 
							    "gender": "female", 
							    "age": 30, 
							    "email": "auroraporter@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2560.1858999999999, 
							    "id": "56066aa945a50eba2fe881e0"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Kristy Baker", 
							    "gender": "female", 
							    "age": 23, 
							    "email": "kristybaker@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3149.1543999999999, 
							    "id": "56066aa9e355ff7d2e8e2691"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Bettie Pratt", 
							    "gender": "female", 
							    "age": 32, 
							    "email": "bettiepratt@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1655.8378, 
							    "id": "56066aa9f31916a2d77157bf"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Rutledge Fleming", 
							    "gender": "male", 
							    "age": 27, 
							    "email": "rutledgefleming@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3250.4965999999999, 
							    "id": "56066aa983770d005a693856"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Letha Cummings", 
							    "gender": "female", 
							    "age": 22, 
							    "email": "lethacummings@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2142.0835000000002, 
							    "id": "56066aa9bc4c27a6eabe076f"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Pansy Williams", 
							    "gender": "female", 
							    "age": 40, 
							    "email": "pansywilliams@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1807.1552999999999, 
							    "id": "56066aa926a90e589c0f9787"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Barrera Carr", 
							    "gender": "male", 
							    "age": 24, 
							    "email": "barreracarr@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1491.1999000000001, 
							    "id": "56066aa9553081fcbc97272d"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Avery Pickett", 
							    "gender": "male", 
							    "age": 36, 
							    "email": "averypickett@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2889.8035, 
							    "id": "56066aa9847dacb65fae13c8"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Doris Frederick", 
							    "gender": "female", 
							    "age": 36, 
							    "email": "dorisfrederick@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1963.3596, 
							    "id": "56066aa9934d9fa1212971ac"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Joseph Yang", 
							    "gender": "male", 
							    "age": 30, 
							    "email": "josephyang@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1278.8194000000001, 
							    "id": "56066aa998ab73fc24c99782"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Marla Ashley", 
							    "gender": "female", 
							    "age": 23, 
							    "email": "marlaashley@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3461.4238999999998, 
							    "id": "56066aa957e2ff16e7149379"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Potts Fernandez", 
							    "gender": "male", 
							    "age": 33, 
							    "email": "pottsfernandez@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2389.4884000000002, 
							    "id": "56066aa911fd9ab18a2536a3"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Etta Terry", 
							    "gender": "female", 
							    "age": 39, 
							    "email": "ettaterry@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2805.9933999999998, 
							    "id": "56066aa91dcf0dbd6486cb44"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Newton Pacheco", 
							    "gender": "male", 
							    "age": 26, 
							    "email": "newtonpacheco@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1999.0447999999999, 
							    "id": "56066aa915e419b43e2b121a"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Reba Shelton", 
							    "gender": "female", 
							    "age": 32, 
							    "email": "rebashelton@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2893.4425999999999, 
							    "id": "56066aa9c97811195f79d3ef"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Hubbard Woodard", 
							    "gender": "male", 
							    "age": 29, 
							    "email": "hubbardwoodard@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1925.5368000000001, 
							    "id": "56066aa9670c483556543fd9"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Ivy Good", 
							    "gender": "female", 
							    "age": 32, 
							    "email": "ivygood@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1527.2156, 
							    "id": "56066aa9fefc88bc61c224c5"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Kris Crosby", 
							    "gender": "female", 
							    "age": 28, 
							    "email": "kriscrosby@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1897.5773999999999, 
							    "id": "56066aa9c8993f0483221bdb"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Dixon Curtis", 
							    "gender": "male", 
							    "age": 24, 
							    "email": "dixoncurtis@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2540.9533000000001, 
							    "id": "56066aa9979c85652e3b43be"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Minnie Phillips", 
							    "gender": "female", 
							    "age": 23, 
							    "email": "minniephillips@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1565.6020000000001, 
							    "id": "56066aa9d64bdd70a8f0b446"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Beatrice Morin", 
							    "gender": "female", 
							    "age": 27, 
							    "email": "beatricemorin@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2480.7665999999999, 
							    "id": "56066aa98831b659943881bb"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Eliza Franklin", 
							    "gender": "female", 
							    "age": 26, 
							    "email": "elizafranklin@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3092.2363999999998, 
							    "id": "56066aa9fb70dd743b9ada47"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Monique Estrada", 
							    "gender": "female", 
							    "age": 40, 
							    "email": "moniqueestrada@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2947.7565, 
							    "id": "56066aa9f5ed868c3ada07e4"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Kelsey Gill", 
							    "gender": "female", 
							    "age": 38, 
							    "email": "kelseygill@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1794.6344999999999, 
							    "id": "56066aa92ee1ff8d1807cd79"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Pena Henson", 
							    "gender": "male", 
							    "age": 24, 
							    "email": "penahenson@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3849.982, 
							    "id": "56066aa9bcd073a75dbe5c22"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Lupe Baldwin", 
							    "gender": "female", 
							    "age": 35, 
							    "email": "lupebaldwin@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2285.7739000000001, 
							    "id": "56066aa9887b36ce5948ceaf"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Keisha Daniel", 
							    "gender": "female", 
							    "age": 30, 
							    "email": "keishadaniel@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2898.4031, 
							    "id": "56066aa972d0f89d48d91cda"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Kay Deleon", 
							    "gender": "female", 
							    "age": 28, 
							    "email": "kaydeleon@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1100.9213999999999, 
							    "id": "56066aa9f15740b029e1a222"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Sykes Macias", 
							    "gender": "male", 
							    "age": 21, 
							    "email": "sykesmacias@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3553.2631999999999, 
							    "id": "56066aa98040b47a75bec18a"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Michael Roach", 
							    "gender": "female", 
							    "age": 25, 
							    "email": "michaelroach@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1285.3862999999999, 
							    "id": "56066aa937a7a0c2e38ff8f9"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Denise Johns", 
							    "gender": "female", 
							    "age": 36, 
							    "email": "denisejohns@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1881.3294000000001, 
							    "id": "56066aa9e62a02f05044dabd"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Barry Trujillo", 
							    "gender": "male", 
							    "age": 33, 
							    "email": "barrytrujillo@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2074.4713999999999, 
							    "id": "56066aa9a20baf578c8db6d8"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Kristine Talley", 
							    "gender": "female", 
							    "age": 35, 
							    "email": "kristinetalley@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1018.7467, 
							    "id": "56066aa942ea4e8e70e15bbc"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Lula Marks", 
							    "gender": "female", 
							    "age": 23, 
							    "email": "lulamarks@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2099.5360999999998, 
							    "id": "56066aa9e7a98957bf0d63ca"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Janell Ellison", 
							    "gender": "female", 
							    "age": 22, 
							    "email": "janellellison@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1336.1170999999999, 
							    "id": "56066aa99cf98882d725afac"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Gayle House", 
							    "gender": "female", 
							    "age": 25, 
							    "email": "gaylehouse@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2238.6306, 
							    "id": "56066aa9f5e4bc714137cf1b"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Allison Chavez", 
							    "gender": "male", 
							    "age": 29, 
							    "email": "allisonchavez@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3527.5378999999998, 
							    "id": "56066aa92b0454a2a0767e1b"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Doreen Battle", 
							    "gender": "female", 
							    "age": 39, 
							    "email": "doreenbattle@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1695.5097000000001, 
							    "id": "56066aa92ead3e97ab72d585"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Morgan Holcomb", 
							    "gender": "female", 
							    "age": 24, 
							    "email": "morganholcomb@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1333.8434, 
							    "id": "56066aa981f2caddeb4bbe43"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Latasha Gilmore", 
							    "gender": "female", 
							    "age": 32, 
							    "email": "latashagilmore@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2498.9252999999999, 
							    "id": "56066aa9f1592e2aebbfe55a"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Anna Barrett", 
							    "gender": "female", 
							    "age": 34, 
							    "email": "annabarrett@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3041.8886000000002, 
							    "id": "56066aa922129fdf8d4ed4e7"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Lana Booth", 
							    "gender": "female", 
							    "age": 28, 
							    "email": "lanabooth@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2858.3085000000001, 
							    "id": "56066aa9fc2b165de16aba94"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Shepherd Haney", 
							    "gender": "male", 
							    "age": 28, 
							    "email": "shepherdhaney@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3952.6253999999999, 
							    "id": "56066aa9c93721c5e5182577"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Bass Todd", 
							    "gender": "male", 
							    "age": 29, 
							    "email": "basstodd@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3326.0201000000002, 
							    "id": "56066aa992bdca032116532e"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Bianca Shepard", 
							    "gender": "female", 
							    "age": 35, 
							    "email": "biancashepard@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1209.5944999999999, 
							    "id": "56066aa96cb6b59181011b9e"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Downs Buckley", 
							    "gender": "male", 
							    "age": 25, 
							    "email": "downsbuckley@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3762.1343000000002, 
							    "id": "56066aa9481bbe1ec0f6d1b3"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Dejesus Cleveland", 
							    "gender": "male", 
							    "age": 37, 
							    "email": "dejesuscleveland@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3105.2766999999999, 
							    "id": "56066aa9d079dce9cc5bf0cf"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Clark Walsh", 
							    "gender": "male", 
							    "age": 33, 
							    "email": "clarkwalsh@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3596.1109999999999, 
							    "id": "56066aa900dc4976c075651f"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Jennings Mcleod", 
							    "gender": "male", 
							    "age": 34, 
							    "email": "jenningsmcleod@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1050.0316, 
							    "id": "56066aa9554eb80e2e43b85e"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Montoya Mcdaniel", 
							    "gender": "male", 
							    "age": 27, 
							    "email": "montoyamcdaniel@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3561.1214, 
							    "id": "56066aa97911ce9c61aece99"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Winters Guthrie", 
							    "gender": "male", 
							    "age": 22, 
							    "email": "wintersguthrie@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2581.0617999999999, 
							    "id": "56066aa975f746de726eb899"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Josie Mclaughlin", 
							    "gender": "female", 
							    "age": 29, 
							    "email": "josiemclaughlin@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1813.0727999999999, 
							    "id": "56066aa915e2dbb85de5af78"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Luna Combs", 
							    "gender": "male", 
							    "age": 27, 
							    "email": "lunacombs@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3417.3984, 
							    "id": "56066aa9a8501edca97918c0"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Peters Rodriguez", 
							    "gender": "male", 
							    "age": 33, 
							    "email": "petersrodriguez@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2863.1649000000002, 
							    "id": "56066aa99a9871210199e1f8"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Oneil Jefferson", 
							    "gender": "male", 
							    "age": 21, 
							    "email": "oneiljefferson@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1701.1744000000001, 
							    "id": "56066aa9d95bf46d675d46c5"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Maureen Gardner", 
							    "gender": "female", 
							    "age": 26, 
							    "email": "maureengardner@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3215.0182, 
							    "id": "56066aa98b87f1b4bffe20df"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Carissa Woods", 
							    "gender": "female", 
							    "age": 20, 
							    "email": "carissawoods@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2625.3263999999999, 
							    "id": "56066aa9eceeec042292a872"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Augusta Craft", 
							    "gender": "female", 
							    "age": 35, 
							    "email": "augustacraft@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2142.0437000000002, 
							    "id": "56066aa9ff5bf44f8be98fc7"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Josefa Gallagher", 
							    "gender": "female", 
							    "age": 25, 
							    "email": "josefagallagher@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2810.7203, 
							    "id": "56066aa90b67cc6d6a51ffa3"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Mcdonald Vinson", 
							    "gender": "male", 
							    "age": 40, 
							    "email": "mcdonaldvinson@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3278.6948000000002, 
							    "id": "56066aa916b09bac25d8000d"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Lilia Raymond", 
							    "gender": "female", 
							    "age": 29, 
							    "email": "liliaraymond@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2232.9946, 
							    "id": "56066aa91d14fd5670852b9a"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Sophie Francis", 
							    "gender": "female", 
							    "age": 26, 
							    "email": "sophiefrancis@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1105.3939, 
							    "id": "56066aa9866cbb2af67ef460"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Nina Henry", 
							    "gender": "female", 
							    "age": 25, 
							    "email": "ninahenry@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3179.5769, 
							    "id": "56066aa955f33343220fa19a"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Burch Fox", 
							    "gender": "male", 
							    "age": 40, 
							    "email": "burchfox@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2202.9976000000001, 
							    "id": "56066aa9eed42801bf8f6f9a"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Marva Norris", 
							    "gender": "female", 
							    "age": 24, 
							    "email": "marvanorris@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1158.4458999999999, 
							    "id": "56066aa94aa5a56627b266f3"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "French Hamilton", 
							    "gender": "male", 
							    "age": 31, 
							    "email": "frenchhamilton@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3604.7460999999998, 
							    "id": "56066aa98d3d484043254159"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Mckee Nelson", 
							    "gender": "male", 
							    "age": 25, 
							    "email": "mckeenelson@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2318.5423000000001, 
							    "id": "56066aa9d4301b4896f90015"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Black Hatfield", 
							    "gender": "male", 
							    "age": 40, 
							    "email": "blackhatfield@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3269.2057, 
							    "id": "56066aa90f113878f2ac49bb"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Sloan Oliver", 
							    "gender": "male", 
							    "age": 40, 
							    "email": "sloanoliver@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3777.5511999999999, 
							    "id": "56066aa9c890215f6a263942"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Tisha Neal", 
							    "gender": "female", 
							    "age": 30, 
							    "email": "tishaneal@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2359.5041999999999, 
							    "id": "56066aa96a6962b1f46e0595"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Goodwin Jacobson", 
							    "gender": "male", 
							    "age": 38, 
							    "email": "goodwinjacobson@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2869.5162999999998, 
							    "id": "56066aa92404851527d34fa7"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Della Hoffman", 
							    "gender": "female", 
							    "age": 27, 
							    "email": "dellahoffman@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3285.2741999999998, 
							    "id": "56066aa90ab13d564a6a3fa1"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Fuentes Cash", 
							    "gender": "male", 
							    "age": 31, 
							    "email": "fuentescash@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2038.8689999999999, 
							    "id": "56066aa9aa3087daba04f292"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Francis York", 
							    "gender": "female", 
							    "age": 29, 
							    "email": "francisyork@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2919.6938, 
							    "id": "56066aa945c050828993ef5b"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Claudette Richards", 
							    "gender": "female", 
							    "age": 20, 
							    "email": "claudetterichards@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2256.2846, 
							    "id": "56066aa971c6d247bc448fd0"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Brock Kirkland", 
							    "gender": "male", 
							    "age": 30, 
							    "email": "brockkirkland@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3341.0365999999999, 
							    "id": "56066aa992373eeded7d7833"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Snider Browning", 
							    "gender": "male", 
							    "age": 39, 
							    "email": "sniderbrowning@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1318.9601, 
							    "id": "56066aa9f1adb0df091fd3ac"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Wanda Weber", 
							    "gender": "female", 
							    "age": 29, 
							    "email": "wandaweber@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2619.0509999999999, 
							    "id": "56066aa959cd1e923d606209"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Pate Benson", 
							    "gender": "male", 
							    "age": 24, 
							    "email": "patebenson@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2872.7147, 
							    "id": "56066aa94b70484a5e6e6c6d"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Neal Herman", 
							    "gender": "male", 
							    "age": 34, 
							    "email": "nealherman@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3539.5646999999999, 
							    "id": "56066aa93f9655c6af3f5b95"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Gibson Case", 
							    "gender": "male", 
							    "age": 37, 
							    "email": "gibsoncase@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3621.0677000000001, 
							    "id": "56066aa9c975e07518263a6e"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Mendez Guzman", 
							    "gender": "male", 
							    "age": 34, 
							    "email": "mendezguzman@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2570.029, 
							    "id": "56066aa9583f7bb13fb8d8c1"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Schneider Jackson", 
							    "gender": "male", 
							    "age": 25, 
							    "email": "schneiderjackson@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2028.8695, 
							    "id": "56066aa9b46bccacc2455201"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Franco Melton", 
							    "gender": "male", 
							    "age": 37, 
							    "email": "francomelton@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3485.9987999999998, 
							    "id": "56066aa92e3aa4ab00ae2715"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Harvey Crawford", 
							    "gender": "male", 
							    "age": 20, 
							    "email": "harveycrawford@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1984.3561999999999, 
							    "id": "56066aa9d46a19703f88bedb"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Sheri Maynard", 
							    "gender": "female", 
							    "age": 28, 
							    "email": "sherimaynard@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3410.0713999999998, 
							    "id": "56066aa9709d609c31948a24"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Singleton Hickman", 
							    "gender": "male", 
							    "age": 37, 
							    "email": "singletonhickman@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3484.5111000000002, 
							    "id": "56066aa9f8622275ad95d79a"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Hansen Hammond", 
							    "gender": "male", 
							    "age": 32, 
							    "email": "hansenhammond@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1257.1832999999999, 
							    "id": "56066aa9159929cd33981130"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Christy Conway", 
							    "gender": "female", 
							    "age": 24, 
							    "email": "christyconway@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3099.1862000000001, 
							    "id": "56066aa9952259650e223f6b"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Daniels Cook", 
							    "gender": "male", 
							    "age": 32, 
							    "email": "danielscook@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1154.3145, 
							    "id": "56066aa97349cb5e64480cc9"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Jeanine Acevedo", 
							    "gender": "female", 
							    "age": 36, 
							    "email": "jeanineacevedo@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3353.5353, 
							    "id": "56066aa994af0abe4578757e"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Jennie Guerra", 
							    "gender": "female", 
							    "age": 22, 
							    "email": "jennieguerra@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3030.9634999999998, 
							    "id": "56066aa9392476688b399d83"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Aileen Kidd", 
							    "gender": "female", 
							    "age": 29, 
							    "email": "aileenkidd@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2321.3724000000002, 
							    "id": "56066aa92c519ccafa75435d"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Chandler Santos", 
							    "gender": "male", 
							    "age": 39, 
							    "email": "chandlersantos@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2855.4065999999998, 
							    "id": "56066aa9827ecf4c7e745e3c"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Rhodes William", 
							    "gender": "male", 
							    "age": 24, 
							    "email": "rhodeswilliam@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3994.0407, 
							    "id": "56066aa97820a4daa8e60f4f"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Rosalinda Bolton", 
							    "gender": "female", 
							    "age": 26, 
							    "email": "rosalindabolton@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 2310.3723, 
							    "id": "56066aa97dc7b1d48767f026"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Wiley Best", 
							    "gender": "male", 
							    "age": 26, 
							    "email": "wileybest@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3653.9731000000002, 
							    "id": "56066aa918421969603eb1db"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Geraldine Allison", 
							    "gender": "female", 
							    "age": 23, 
							    "email": "geraldineallison@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3892.0255000000002, 
							    "id": "56066aa98d28b4431d99a9f9"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Love Castro", 
							    "gender": "male", 
							    "age": 23, 
							    "email": "lovecastro@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1499.0253, 
							    "id": "56066aa9122a1db603fe4698"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Maxine Riley", 
							    "gender": "female", 
							    "age": 38, 
							    "email": "maxineriley@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1517.7791, 
							    "id": "56066aa96519d5e324532d21"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Velma Murphy", 
							    "gender": "female", 
							    "age": 29, 
							    "email": "velmamurphy@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3514.8823000000002, 
							    "id": "56066aa98b02f84350c53546"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Holman Wolf", 
							    "gender": "male", 
							    "age": 37, 
							    "email": "holmanwolf@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1397.3371999999999, 
							    "id": "56066aa9ac1a6fecdf61beb6"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Nellie Weeks", 
							    "gender": "female", 
							    "age": 26, 
							    "email": "nellieweeks@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3618.3613, 
							    "id": "56066aa9f5e91dbbd37945cc"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Santana West", 
							    "gender": "male", 
							    "age": 35, 
							    "email": "santanawest@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1755.0226, 
							    "id": "56066aa99d6f606aecdbefcd"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Jacklyn Leblanc", 
							    "gender": "female", 
							    "age": 31, 
							    "email": "jacklynleblanc@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2984.6024000000002, 
							    "id": "56066aa9811f9ad0e15eaad9"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Sampson Pollard", 
							    "gender": "male", 
							    "age": 31, 
							    "email": "sampsonpollard@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2221.4009000000001, 
							    "id": "56066aa959ea1bcd0aa9e719"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Dixie Cross", 
							    "gender": "female", 
							    "age": 32, 
							    "email": "dixiecross@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3504.2799, 
							    "id": "56066aa9978b74639f8fe576"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Gillespie Ortiz", 
							    "gender": "male", 
							    "age": 29, 
							    "email": "gillespieortiz@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2466.7876000000001, 
							    "id": "56066aa94b8930d7b0d2180c"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Wall Moore", 
							    "gender": "male", 
							    "age": 36, 
							    "email": "wallmoore@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 3432.2419, 
							    "id": "56066aa9857397220ee840e2"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Shelby Strickland", 
							    "gender": "female", 
							    "age": 27, 
							    "email": "shelbystrickland@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2047.6759999999999, 
							    "id": "56066aa9b4d7fdd5ca214954"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Kidd Schwartz", 
							    "gender": "male", 
							    "age": 32, 
							    "email": "kiddschwartz@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3072.0173, 
							    "id": "56066aa952c69bfa58f18e51"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Nadia Kirby", 
							    "gender": "female", 
							    "age": 28, 
							    "email": "nadiakirby@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1305.8989999999999, 
							    "id": "56066aa94436309a52244315"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Mueller Cole", 
							    "gender": "male", 
							    "age": 21, 
							    "email": "muellercole@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1600.8513, 
							    "id": "56066aa9c3e5e5354902be48"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Mitzi Bridges", 
							    "gender": "female", 
							    "age": 29, 
							    "email": "mitzibridges@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 2907.0603999999998, 
							    "id": "56066aa96514b00f4c913916"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Sharp Cunningham", 
							    "gender": "male", 
							    "age": 40, 
							    "email": "sharpcunningham@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2710.4405999999999, 
							    "id": "56066aa93b026fd680a03a2e"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Davenport Mays", 
							    "gender": "male", 
							    "age": 22, 
							    "email": "davenportmays@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3383.7194, 
							    "id": "56066aa9c95860dce1157561"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Matthews Keller", 
							    "gender": "male", 
							    "age": 32, 
							    "email": "matthewskeller@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 1512.7756999999999, 
							    "id": "56066aa91e05c917d7cad300"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Esther Kemp", 
							    "gender": "female", 
							    "age": 33, 
							    "email": "estherkemp@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 3245.2055999999998, 
							    "id": "56066aa9b94bbc7fca5cb541"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Cynthia Madden", 
							    "gender": "female", 
							    "age": 36, 
							    "email": "cynthiamadden@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3662.3611999999998, 
							    "id": "56066aa9f3c99025283ebb63"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Lyons Berry", 
							    "gender": "male", 
							    "age": 37, 
							    "email": "lyonsberry@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 2982.8236999999999, 
							    "id": "56066aa9a9828ba76a37a3ca"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Guzman Dotson", 
							    "gender": "male", 
							    "age": 39, 
							    "email": "guzmandotson@comverges.com", 
							    "eyeColor": "blue", 
							    "balance": 1764.0485000000001, 
							    "id": "56066aa9a97216d2f493afae"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Janna Ward", 
							    "gender": "female", 
							    "age": 36, 
							    "email": "jannaward@comverges.com", 
							    "eyeColor": "brown", 
							    "balance": 1063.3882000000001, 
							    "id": "56066aa98989c938abdece12"
							  }, 
							  {
							    "picture": "http://placehold.it/32x32", 
							    "name": "Nicole Kennedy", 
							    "gender": "female", 
							    "age": 33, 
							    "email": "nicolekennedy@comverges.com", 
							    "eyeColor": "green", 
							    "balance": 3413.9124999999999, 
							    "id": "56066aa93404140ea345636d"
							  }
							];

			
			obj.getEyeColorUsers = function(color) {
				console.log('getEyeColorUsers', color);
				return $filter('EyeColor')(obj.usersList, color);
			};
			
			obj.getRubleFormat = function() {
				return $filter('Ruble')(obj.usersList);
			};

			/*obj.getUsers = function(){
				return obj.usersList;
			}	*/		
			obj.getPrivate = function(){
				return Private;
			};
			obj.setPrivate = function(_private){
				Private = _private;
			};

			return obj;
		};
		//ngInject
		function EyeColorFilter(){
			return function(input, color){
				color = color || 'green';
				var result = [];
				angular.forEach(input, function(elem, index){
					if(elem.eyeColor == color) {
						result.push(elem);
					}
				});
				console.log('EyeColorFilter', result);
				return result;
				
			}
		};

		function toRuble(curr){
			curr = Math.ceil((curr)*100)/100;
			var currInt = Math.ceil(curr);
			var firstPart = currInt.toString(10).length%3;
			//var groups = (currInt.toString(10).length - firstPart)/3;
			curr = curr.toString(10);
			var len = curr.length;
			var curString = '';
			for(var i = 0; i < len; i++){
				curString = curString+curr[i];
				if((i+1) == firstPart){
					curString = curString+' ';
				}
				if(((i+1-firstPart)%3 == 0) && (curr[i+1]!='.') &&!((i+1) == firstPart)){
					curString= curString+' ';
				}
			}
			curString +=' руб.';
			//console.log(curString);
			return curString;
		}
		/*
		function RubleFilter(){
			return function(input){
				
				
				angular.forEach(input, function(elem, index){
				
					elem.balance = toRuble(elem.balance);
					
				});
				return input;
				
			}
		}
		*/
		function RubleFilter(){
			return function(input){
				return String(Math.floor(input * 100)/100).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ') + ' руб.';
			}
		}
		//ngInject
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
		//ngInject
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

	function usersController($log, UsersFactory, UsersService, $rootScope, $scope){
		//$scope.name = "users";
		$log.debug("============  Users Controller  ================");
		this.usersList = [{
			name : "Alla",
			email : "alla@inbox.com"

		}];
		var self = this;

		$scope.hello = "Hello!";
		setTimeout(function(){
			$scope.$apply(function(){
				$scope.hello = "Good buy!"
			});
		}, 800);
		$scope.$watch('hello', function(newVal, oldVal){
			console.log("watch", newVal, oldVal);
		});

		$scope.eyeColor = 'blue';
		$scope.$watch('eyeColor', function(color){
			console.log($scope.eyeColor, color);
			self.list = UsersFactory.getEyeColorUsers(color);
		});
		

		self.eyeColorModel = "green";
		//self.hello = UsersFactory.getPrivate();
		self.hello = UsersFactory.helloPrivate();
		console.log(self.hello);

		console.log("UsersService.Private", UsersService.getPrivate());

		self.addUser = function(user){
			self.usersList.push(user);
		};
		self.changeColor = function(color){
			self.list = UsersFactory.getEyeColorUsers(color);
		};

		//self.list = UsersFactory.getEyeColorUsers(self.eyeColorModel);
		self.list = UsersFactory.getEyeColorUsers($scope.eyeColor);

		self.list = UsersFactory.getRubleFormat();
		//self.list = UsersFactory.getUsers();

		
		
	}

//ngInject
function UsersConfig($provide, $stateProvider, $logProvider, UsersProvProvider){
		$stateProvider
		.state('users.state1',{
			url: '/state1',
			template: '<h2>State1</h2>'
		})
		.state('users.state2',{
			url: '/state2',
			template: '<h2>State2</h2>'

		})
		/*
			Все будущие зависимости надо писать сверху, а основную в самом низу, иначе есть риск, что она будет переписана.
			адреса - angular складывает 140 строку url: '/users', с 128 url: '/state1', и таким образом получается url "/users/state1"
		*/
		.state('users',{
			url: '/users',
			templateUrl : 'app/users/users.html',
			controller : 'UsersCtrl',
			controllerAs : 'usc'
		});
		//console.log(UsersProvider);
		UsersProvProvider.setPrivate("Not almost private");

		 $provide.decorator('UsersFactory',['$delegate', function($delegate){
			$delegate.helloPrivate = function(){
				return "Hello "+ $delegate.getPrivate();
			}
			return $delegate;
		}]);

		$logProvider.debugEnabled(false);
	}



})();



;(function(){
	'use strict';
//registration part
	angular.module('Loft.Auth', [
		'Loft.Fire'
		])
	.factory('Authentication', AuthenticationFactory);
//ngInject
	function  AuthenticationFactory(dbc, $firebaseAuth, $rootScope, $firebaseObject){
		var obj = {};

		var ref = dbc.getRef();
		var auth = $firebaseAuth(ref);
		var usersRef = ref.child('users');

		obj.authObj = function(_user){
			console.log('====  authObj  ====');
			return auth.$authWithPassword(_user);
		};
		obj.login = function(_user){
			console.log('====  Login Existing User  ====');
			console.log(_user);
			return auth.$authWithPassword(_user);
		}

		obj.getAuth = function(){
			console.log('====  getAuth  ====');
			//var authData = auth.$getAuth();
			/*if (authData) {
				 
				  console.log("Logged in as:", authData.uid);
				} else {
				  
				  console.log("Logged out");
			}*/
			//endif
		}//end of getAuth

		obj.onAuth = function(){
			console.log('====  onAuth  ====');

			auth.$onAuth(function(authData) {
			  if (authData) {
			    console.log("Logged in as:", authData.uid);
			    var user = $firebaseObject(usersRef.child(authData.uid));
			    user.$loaded(function(_user){
			    	$rootScope.currentUser.fullname = _user.fullname;
			    	$rootScope.currentUser.id = _user.$id;
			    })
			    
			    $rootScope.isUserLogged = true;
			    
			  } else {
			  	$rootScope.isUserLogged = false;
			  	$rootScope.currentUser.fullname = null;
			  	$rootScope.currentUser.id = null;
			    console.log("Not logged in");
			    
			  }
			 // obj.getAuth();
			});
		}//end of onAuth

		obj.logoff = function(){
			console.log("Logged out");
			$rootScope.isUserLogged = false;
			auth.$unauth();
		}

		obj.onAuth();


	obj.createUser = function(newUser){
			console.log('====  createUser  ====');
			console.log(newUser);
			return auth.$createUser({
				'email' : newUser.email,
				'password' : newUser.password
			})
			.then(function(userData) {
			  console.log("User " + userData.uid + " created successfully!");
	  		usersRef.child(userData.uid)
	  		.set({
	  			fullname: newUser.fullname || 'Dear Friend',
	  			email: newUser.email,
	  			date: Firebase.ServerValue.TIMESTAMP
	  		});
			  return auth.$authWithPassword({
						'email' : newUser.email,
						'password' : newUser.password
					});
		  })
			.then(function(authData) {
		    console.log("Logged in as:", authData.uid);
		  }).catch(function(error) {
		    console.error("Error: ", error);
		  }); 
		}//end of createUser

		obj.facebookSignIn = function(){
			console.log("facebookSignIn");
			return auth.$authWithOAuthPopup("facebook").then(function(authData) {
					  console.log("Facebook Sign In:", authData.uid);
					}).catch(function(error) {
					  console.error("Authentication failed:", error);
					});
		}

		obj.facebookSignUp = function(){
			console.log("facebookSignUp");
			return auth.$authWithOAuthPopup("facebook")
			.then(function(authData) {
				usersRef.child(authData.uid)
			  		.set({
			  			fullname: authData.facebook.displayName,
			  			email: null,
			  			facebookId: authData.facebook.id,
			  			avatar: authData.facebook.profileImageURL,
			  			date: Firebase.ServerValue.TIMESTAMP
			  		});
					  console.log("Facebook Sign Up:", authData.uid);
					}).catch(function(error) {
					  console.error("Authentication failed:", error);
					});
		}

		return obj;

		
	}//end of factory  https://auth.firebase.com/v2/awfitness/auth/facebook/callback
})();
;(function(){
	'use strict';

	angular.module('Loft.Fire', [
		'firebase'
		])
	.factory('dbc', dbcFactory);

	function dbcFactory(FIREBASE_URL, $firebaseAuth){
		var obj = {};

		var reference = new Firebase(FIREBASE_URL);

		obj.getRef = function(){
			return reference;
		};

		

		return obj;

	}//end of factory
})();
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