(function () {
    'use strict';

    angular.module('gfpApp').component('categoria', {
        bindings:{
            id: '<',
            nome: '<',
            descricao: '<',
            add: '&',
            remove: '&',
            update: '&'
        },
        controllerAs: 'vm',
        controller: function (categoriaService, $sessionStorage, $timeout) {

            var vm = this;
            vm.categorias = [];
            vm.categoria = {'id': null};
            vm.editCategoria = {};
            vm.detailCategoria = {};
            vm.ocultar = true;

            let sessionIsLogged = $sessionStorage.isLogged;
            if (sessionIsLogged == null) {
                vm.isLogged = $sessionStorage.isLogged = false;
            }
            vm.isLogged = $sessionStorage.isLogged;

            vm.$onInit = function () {

                categoriaService.getAll().then(function (response) {

                    vm.categorias = response;
                });

                vm.add = function (categoria) {

                    $sessionStorage.successMessagebool = true;
                    vm.successMessagebool = $sessionStorage.successMessagebool;
                    $timeout(function () {
                        $sessionStorage.successMessagebool = false;
                        vm.successMessagebool = $sessionStorage.successMessagebool;
                    },2000);

                    var novaLista = categoriaService.add(categoria);
                    vm.categorias = novaLista;
                };

                vm.remove = function(categoriaId){

                    var novaLista = categoriaService.remove(categoriaId);
                    vm.categorias = novaLista;
                };

                vm.update = function (categoria) {

                    $sessionStorage.successMessagebool = true;
                    vm.successMessagebool = $sessionStorage.successMessagebool;

                    $timeout(function () {
                        $sessionStorage.successMessagebool = false;
                        vm.successMessagebool = $sessionStorage.successMessagebool;
                    },2000);

                    var novaLista = categoriaService.update(categoria);
                    vm.categorias = novaLista;
                }
            };
        },
        templateUrl: 'templates/categoria.html'
    });
})();