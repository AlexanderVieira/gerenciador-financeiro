(function () {
    'use strict';

    angular.module('gfpApp').component('lancamento', {
        bindings:{
          id: '<',
          nome: '<',
          descricao: '<',
          valor: '<',
          receita: '<',
          categoria: '<',
          data: '<',
          repeticoes: '<',
          repetitividade: '<',
          add: '&',
          remove: '&'
        },
        controllerAs: 'vm',
        controller: function (lancamentoService) {

            var vm = this;
            vm.lancamentos = [];
            vm.lancamento = {};

            vm.$onInit = function () {
                lancamentoService.getAll().then(function (response) {
                    vm.lancamentos = response;
                });

                vm.add = function (lancamento) {
                    var list = vm.lancamentos;
                    lancamentoService.add(lancamento, list);
                };

                vm.remove = function (lancamento) {
                    var list = vm.lancamentos;
                    lancamentoService.remove(lancamento, list);
                }
            };
        },
        templateUrl: 'templates/lancamento.component.html'
    });
})();