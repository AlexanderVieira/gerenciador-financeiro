(function () {
    'use strict';

    angular.module('gfpApp').component('noticia', {
        bindings:{
            id: '<',
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
        controller: function (noticiaService, $sessionStorage, $timeout) {

            var vm = this;
            vm.noticias = [];
            vm.noticia = {'id': null};
            vm.editNoticia = {};
            vm.detailNoticia = {};
            vm.ocultar = true;

            let sessionIsLogged = $sessionStorage.isLogged;
            if (sessionIsLogged == null) {
                vm.isLogged = $sessionStorage.isLogged = false;
            }
            vm.isLogged = $sessionStorage.isLogged;

            vm.$onInit = function () {

                noticiaService.getAll().then(function (response) {

                    vm.noticias = response;
                });

                vm.add = function (noticia) {

                    $sessionStorage.successMessagebool = true;
                    vm.successMessagebool = $sessionStorage.successMessagebool;

                    $timeout(function () {
                        $sessionStorage.successMessagebool = false;
                        vm.successMessagebool = $sessionStorage.successMessagebool;
                    },2000);

                    var novalista = noticiaService.add(noticia);
                    vm.noticias = novalista;

                };

                vm.remove = function(noticiaId){

                    var novaLista = noticiaService.remove(noticiaId);
                    vm.noticias = novaLista;
                };

                vm.update = function (noticia) {

                    $sessionStorage.successMessagebool = true;
                    vm.successMessagebool = $sessionStorage.successMessagebool;

                    $timeout(function () {
                        $sessionStorage.successMessagebool = false;
                        vm.successMessagebool = $sessionStorage.successMessagebool;
                    },2000);

                    var novaLista = noticiaService.update(noticia);
                    vm.noticias = novaLista;
                }
            };
        },
        templateUrl: 'templates/noticia.html'
    });
})();