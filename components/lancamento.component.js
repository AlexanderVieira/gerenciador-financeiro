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
            vm.lancamento = {'id': null};
            vm.editLancamento = {};
            vm.detailLancamento = {};
            vm.ocultar = true;

            vm.$onInit = function () {

                lancamentoService.getAll().then(function (response) {
                    vm.lancamentos = response;
                });

                vm.add = function (lancamento) {

                    lancamentoService.add(lancamento);
                    let lancamentoStorage = localStorage.getItem('lancamentos');
                    var lista = angular.fromJson(lancamentoStorage);
                    vm.lancamentos = lista;

                };

                vm.remove = function(lancamentoId){

                    lancamentoService.remove(lancamentoId);
                    let lancamentoStorage = localStorage.getItem('lancamentos');
                    var lista = angular.fromJson(lancamentoStorage);
                    vm.lancamentos = lista;
                };

                vm.update = function (lancamento) {

                    lancamentoService.update(lancamento);
                    /*var lancamentoStorage = localStorage.getItem('lancamentos');
                    var lista = angular.fromJson(lancamentoStorage);
                    vm.lancamentos = lista;*/
                }
            };
        },
        templateUrl: 'templates/lancamento.html'
    });
})();