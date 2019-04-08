(function () {
    'use strict';

    angular.module('gfpApp').component('login', {
        bindings:{
            email: '=',
            password: '=',
            submit: '&'
        },
        controllerAs: 'vm',
        controller: function (authService, $sessionStorage) {
            var vm = this;
            vm.user = {};

            let sessionIsLogged = $sessionStorage.isLogged;
            if (sessionIsLogged == null) {
                $sessionStorage.isLogged = false;
                vm.isLogged = $sessionStorage.isLogged;
            }

            vm.$onInit = function(){

                vm.submit = function(user) {

                    var email = user.email;
                    var password = user.password;

                    authService.login(email, password);
                    vm.isLogged = $sessionStorage.isLogged;

                };

            };
        },
        templateUrl: 'templates/login.html'
    });
})();