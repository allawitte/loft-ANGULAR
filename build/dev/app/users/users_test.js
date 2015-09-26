'use strict';
describe('В модуле Loft.Users', function(){
	beforeEach(module('Loft.Users'));

	describe('Контроллер UsersCtrl', function(){
		it('был объявлен', inject(function($controller){
			var testCtrl = $controller('Loft.Users');
			expect(testCtrl).toBeDefined;
		}));

		describe('Содержит объект с пользователями', function(){
			it('который инициализирован', inject(function($controller){
				var testCtrl = $controller('Loft.Users');
				expect(testCtrl.usersList).toBeDefined();
				expect(testCtrl.usersList.length).toBeGreaterThen(0);

			}));//end of 'который инициализирован'
			it('Который можно менять', inject(function($controller){
				var testCtrl = $controller('Loft.Users');

				var length = testCtrl.usersList.length;

				testCtrl.addUser({
					name: "testName",
					email: 'user@gmail.com'
				});

				expect(testCtrl.usersList.length).toBe(length + 1);

				expect(testCtrl.usersList[testCtrl.usersList.length-1]).toBeDefined();
				expect(testCtrl.usersList[testCtrl.usersList.length-1].name).toBe("testName");
				expect(testCtrl.usersList[testCtrl.usersList.length-1].email).toBe("user@gmail.com");
			}));  //end of it 'Который можно менять'
		});  //end of describe 'Содержит объект с пользователями'
	}); //end of describe 'Контроллер UsersCtrl'
});//end of descrube 'В модуле Loft.Users'