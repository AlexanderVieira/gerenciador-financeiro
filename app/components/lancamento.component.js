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
        controller: function (lancamentoService, $sessionStorage, $timeout) {

            var vm = this;
            vm.lancamentos = [];
            vm.lancamento = {'id': null};
            vm.editLancamento = {};
            vm.detailLancamento = {};
            vm.ocultar = true;

            let sessionIsLogged = $sessionStorage.isLogged;
            if (sessionIsLogged == null) {
                vm.isLogged = $sessionStorage.isLogged = false;
            }
            vm.isLogged = $sessionStorage.isLogged;

            vm.$onInit = function () {

                lancamentoService.getAll().then(function (response) {

                    vm.lancamentos = response;
                });

                vm.add = function (lancamento) {

                    $sessionStorage.successMessagebool = true;
                    vm.successMessagebool = $sessionStorage.successMessagebool;

                    $timeout(function () {
                        $sessionStorage.successMessagebool = false;
                        vm.successMessagebool = $sessionStorage.successMessagebool;
                    },2000);

                    var novaLista =lancamentoService.add(lancamento);
                    vm.lancamentos = novaLista;

                };

                vm.remove = function(lancamentoId){

                    var novaLista = lancamentoService.remove(lancamentoId);
                    vm.lancamentos = novaLista;
                };

                vm.update = function (lancamento) {

                    $sessionStorage.successMessagebool = true;
                    vm.successMessagebool = $sessionStorage.successMessagebool;

                    $timeout(function () {
                        $sessionStorage.successMessagebool = false;
                        vm.successMessagebool = $sessionStorage.successMessagebool;
                    },2000);

                    var novaLista =lancamentoService.update(lancamento);
                    vm.lancamentos = novaLista;
                }
            };
        },
        templateUrl: 'templates/lancamento.html'
    });
})();