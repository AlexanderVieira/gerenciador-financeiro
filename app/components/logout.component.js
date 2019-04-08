(function () {
    'use strict';

    angular.module('gfpApp').component('logout', {

        controllerAs: 'vm',
        controller: function (authService, $sessionStorage) {
            var vm = this;
            vm.user = {};

            let sessionIsLogged = $sessionStorage.isLogged;
            if (sessionIsLogged == null) {
                vm.isLogged = $sessionStorage.isLogged = false;
            }

            vm.$onInit = function(){

                vm.logout = function () {

                    authService.logout();
                    vm.isLogged = $sessionStorage.isLogged;

                }
            };
        },
        templateUrl: 'templates/logout.html'
    });
})();