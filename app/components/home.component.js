(function () {
    'use strict';

    angular.module('gfpApp').component('home', {
        controllerAs: 'vm',
        controller: function (noticiaService, $sessionStorage) {

            var vm = this;
            vm.noticias = [];
            vm.noticia = {};
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
            };
        },
        templateUrl: 'templates/home.html'
    });
})();