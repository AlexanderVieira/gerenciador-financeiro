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
            remove: '&'
        },
        controllerAs: 'vm',
        controller: function (noticiaService) {

            var vm = this;
            vm.noticias = [];
            vm.noticia = {};

            vm.$onInit = function () {
                noticiaService.getAll().then(function (response) {
                    vm.noticias = response;
                });

                vm.add = function (noticia) {
                    var list = vm.noticia;
                    noticiaService.addTask(noticia, list);
                };

                vm.remove = function (noticia) {
                    var list = vm.noticias;
                    noticiaService.deleteTask(noticia, list);
                }
            };
        },
        templateUrl: 'templates/noticia.component.html'
    });
})();