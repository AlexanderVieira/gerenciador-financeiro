(function () {
    'use strict';

    angular.module('gfpApp').component('categoria', {
        bindings:{
            categoriaId: '=Id',
            nome: '<',
            descricao: '<',
            add: '&',
            remove: '&',
            update: '&'
        },
        controllerAs: 'vm',
        controller: function (categoriaService, $sessionStorage) {

            var vm = this;
            vm.categorias = [];
            vm.categoria = {'id': null};
            vm.editCategoria = {};
            vm.detailCategoria = {};
            vm.ocultar = true;
            /*vm.successMessage = $sessionStorage.successMessage;
            console.log(vm.successMessage);
            vm.successMessagebool = $sessionStorage.successMessagebool;
            console.log(vm.successMessagebool);
*/

            vm.$onInit = function () {

                categoriaService.getAll().then(function (response) {
                    vm.categorias = response;
                    //localStorage.setItem('categorias', angular.toJson(vm.categorias));
                });

                vm.add = function (categoria) {

                    console.log(categoria);
                    $sessionStorage.successMessagebool = true;
                    vm.successMessagebool = $sessionStorage.successMessagebool;

                    categoriaService.add(categoria);
                    /*let categoriaStorage = localStorage.getItem('categorias');
                    var lista = angular.fromJson(categoriaStorage);
                    vm.categorias = lista;*/

                };

                vm.remove = function(categoriaId){

                    categoriaService.remove(categoriaId);
                    /*let categoriaStorage = localStorage.getItem('categorias');
                    var lista = angular.fromJson(categoriaStorage);
                    vm.categorias = lista;*/
                };

                vm.update = function (categoria) {

                    categoriaService.update(categoria);
                    /*var categoriaStorage = localStorage.getItem('categorias');
                    var lista = angular.fromJson(categoriaStorage);
                    vm.categorias = lista;*/
                }
            };
        },
        templateUrl: 'templates/categoria.html'
    });
})();