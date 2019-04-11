(function () {
    'use strict';

    angular.module('gfpApp').component('dashboard', {
        controllerAs: 'vm',
        controller: function ($sessionStorage, calculaFaturamentoService) {

            var vm = this;
            vm.faturamentoMaio2017 = [];

            let sessionIsLogged = $sessionStorage.isLogged;
            if (sessionIsLogged == null) {
                vm.isLogged = $sessionStorage.isLogged = false;
            }
            vm.isLogged = $sessionStorage.isLogged;

            vm.$onInit = function () {

                var faturamentoMaio2017 = calculaFaturamentoService.calcularFaturamentoMaio();
                console.log(faturamentoMaio2017);

            };
        },
        templateUrl: 'templates/dashboard.html'
    });
})();