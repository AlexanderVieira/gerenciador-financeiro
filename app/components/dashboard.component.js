(function () {
    'use strict';

    angular.module('gfpApp').component('dashboard', {
        controllerAs: 'vm',
        controller: function ($sessionStorage, calculaFaturamentoService) {

            var vm = this;
            vm.receitaMaio2017 = 0.0;
            vm.faturamentoMaio2017 = 0.0;

            vm.receitaAbril2017 = 0.0;
            vm.despesaAbril2017 = 0.0;
            vm.faturamentoAbril2017 = 0.0;

            vm.receitaMarco2017 = 0.0;
            vm.faturamentoMarco2017 = 0.0;

            vm.receitaJan2017 = 0.0;
            vm.faturamentoJan2017 = 0.0;

            vm.projecao = 0.0;


            let sessionIsLogged = $sessionStorage.isLogged;
            if (sessionIsLogged == null) {
                vm.isLogged = $sessionStorage.isLogged = false;
            }
            vm.isLogged = $sessionStorage.isLogged;

            vm.$onInit = function () {

                var resultadoMaio2017 = calculaFaturamentoService.calcularFaturamentoMaio();
                vm.receitaMaio2017 = resultadoMaio2017.receita;
                vm.faturamentoMaio2017 = resultadoMaio2017.saldoMaio2017;

                var resultadoAbril = calculaFaturamentoService.calcularFaturamentoAbril();
                vm.receitaAbril2017 = resultadoAbril.receita;
                vm.despesaAbril2017 = resultadoAbril.despesa;
                vm.faturamentoAbril2017 = resultadoAbril.saldoAbril2017;

                var resultadoMarco2017 = calculaFaturamentoService.calcularFaturamentoMarco();
                vm.receitaMarco2017 = resultadoMarco2017.receita;
                vm.faturamentoMarco2017 = resultadoMarco2017.saldoMarco2017;

                var resultadoJaneiro2017 = calculaFaturamentoService.calcularFaturamentoJaneiro();
                vm.receitaJan2017 = resultadoJaneiro2017.receita;
                vm.faturamentoJan2017 = resultadoJaneiro2017.saldoJaneiro2017;

                var projecao = calculaFaturamentoService.calculaProjecaoFaturamento();
                vm.projecao = projecao;

            };
        },
        templateUrl: 'templates/dashboard.html'
    });
})();