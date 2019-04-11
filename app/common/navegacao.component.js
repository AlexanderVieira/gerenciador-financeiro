(function () {
    'use strict';

    angular.module('gfpApp').component('navigation', {
        controllerAs: 'vm',
        controller: function ($sessionStorage) {

            var vm = this;
            let sessionIsLogged = $sessionStorage.isLogged;
            if (sessionIsLogged == null) {
                vm.isLogged = $sessionStorage.isLogged = false;
            }
            vm.isLogged = $sessionStorage.isLogged;
        },
        templateUrl: 'templates/navegacao.html'
    });
})();