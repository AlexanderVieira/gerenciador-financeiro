(function () {
    'use strict';

    angular.module('gfpApp').component('dashboard', {
        controllerAs: 'vm',
        controller: function ($sessionStorage, calculaFaturamentoService) {

            var vm = this;
            vm.faturamentoMaio2017 = [];
            vm.receitaMaio2017 = 0.0;
            vm.faturamentoMaio2017 = 0.0;

            let sessionIsLogged = $sessionStorage.isLogged;
            if (sessionIsLogged == null) {
                vm.isLogged = $sessionStorage.isLogged = false;
            }
            vm.isLogged = $sessionStorage.isLogged;

            vm.$onInit = function () {

                var faturamentoMaio2017 = calculaFaturamentoService.calcularFaturamentoMaio();
                vm.receitaMaio2017 = faturamentoMaio2017.receita;
                vm.faturamentoMaio2017 = faturamentoMaio2017.faturamentoMaio2017;
            };
        },
        templateUrl: 'templates/dashboard.html'
    });
})();