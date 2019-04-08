(function () {
    'use strict';

    angular.module('gfpApp').component('noticia', {
        bindings:{
            noticiaId: '=Id',
            titulo: '<',
            mensagem: '<',
            autor: '<',
            data: '<',
            imagem: '@',
            add: '&',
            remove: '&',
            update: '&'
        },
        controllerAs: 'vm',
        controller: function (noticiaService) {

            var vm = this;
            vm.noticias = [];
            vm.noticia = {'id': null};
            vm.editNoticia = {};
            vm.detailNoticia = {};
            vm.ocultar = true;

            vm.$onInit = function () {

                noticiaService.getAll().then(function (response) {
                    vm.noticias = response;
                });

                vm.add = function (noticia) {

                    noticiaService.add(noticia);
                    let noticiaStorage = localStorage.getItem('noticias');
                    var lista = angular.fromJson(noticiaStorage);
                    vm.noticias = lista;

                };

                vm.remove = function(noticiaId){

                    noticiaService.remove(noticiaId);
                    let noticiaStorage = localStorage.getItem('noticias');
                    var lista = angular.fromJson(noticiaStorage);
                    vm.noticias = lista;
                };

                vm.update = function (noticia) {

                    noticiaService.update(noticia);
                    var noticiaStorage = localStorage.getItem('noticias');
                    var lista = angular.fromJson(noticiaStorage);
                    vm.noticias = lista;
                }
            };
        },
        templateUrl: 'templates/noticia.html'
    });
})();