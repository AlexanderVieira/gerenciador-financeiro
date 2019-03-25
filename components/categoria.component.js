(function () {
    'use strict';

    angular.module('gfpApp').component('categoria', {
        bindings:{
            categoriaId: '=Id',
            nome: '<',
            descricao: '<',
            add: '&',
            remove: '&'
        },
        controllerAs: 'vm',
        controller: function (categoriaService) {

            var vm = this;
            vm.categorias = [];
            vm.categoria = {};

            vm.$onInit = function () {
                categoriaService.getAll().then(function (response) {
                    vm.categorias = response;
                });

                vm.add = function (categoria) {
                    var list = vm.categorias;
                    categoriaService.add(categoria, list);
                };

                vm.remove = function(categoria){
                    var list = vm.categorias;
                    categoriaService.remove(categoria, list);
                }
            };
        },
        templateUrl: 'templates/categoria.component.html'
    });
})();