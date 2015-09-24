'use strict';
describe('В модуле Loft.Users', function(){
	beforeEach(module('Loft.Users'));

	describe('Контроллер UsersCtrl', function(){
		it('был объъявлен', inject(function($controller){
			var testCtrl = $controller('Loft.Users');
			expect(testCtrl).toBeDefined;
		}));

		describe('Содержит объект с пользователями', function(){
			it('который инициализирован', inject(function($controller){
				var testCtrl = $controller('Loft.Users');
				expect(testCtrl.usersList).toBeDefined();
				expect(testCtrl.usersList.length).toBeGreaterThen(0);

			}));
			it('Который можно менять', inject(function($controller){
				var testCtrl = $controller('Loft.Users');
				testCtrl.addUser({
					name: "testName",
					email: 'user@gmail.com'
				});

				expect(testCtrl.usersList[testCtrl.usersList.length-1]).toBeDefined();
				expect(testCtrl.usersList[testCtrl.usersList.length-1].name).toBe("testName");
				expect(testCtrl.usersList[testCtrl.usersList.length-1].email).toBe("user@gmail.com");
			}));
		})
	});
});