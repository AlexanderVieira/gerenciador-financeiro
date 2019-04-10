(function () {
    'use strict';

    angular.module('gfpApp').component('painel', {
        controllerAs: 'vm',
        controller: function ($sessionStorage) {

            var vm = this;

            let sessionIsLogged = $sessionStorage.isLogged;
            if (sessionIsLogged == null) {
                vm.isLogged = $sessionStorage.isLogged = false;
            }
            vm.isLogged = $sessionStorage.isLogged;

            vm.$onInit = function () {

            };
        },
        templateUrl: 'templates/collapsed-sidebar.html'
    });
})();