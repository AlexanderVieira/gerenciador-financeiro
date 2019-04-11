(function () {
    'use strict';

    angular.module('gfpApp').component('home', {
        controllerAs: 'vm',
        controller: function (noticiaService, calculaFaturamentoService, $sessionStorage) {

            var vm = this;
            vm.noticias = [];
            vm.noticia = {};
            vm.ocultar = true;
            vm.projecao = 0.0;

            let sessionIsLogged = $sessionStorage.isLogged;
            if (sessionIsLogged == null) {
                vm.isLogged = $sessionStorage.isLogged = false;
            }
            vm.isLogged = $sessionStorage.isLogged;

            vm.$onInit = function () {
                noticiaService.getAll().then(function (response) {
                    vm.noticias = response;
                });

                var projecao = calculaFaturamentoService.calculaProjecaoFaturamento();
                vm.projecao = projecao;
            };
        },
        templateUrl: 'templates/home.html'
    });
})();