(function () {
    'use strict';

    angular.module('gfpApp').component('home', {
        controllerAs: 'vm',
        controller: function (noticiaService) {

            var vm = this;
            vm.noticias = [];
            vm.noticia = {};

            vm.$onInit = function () {
                noticiaService.getAll().then(function (response) {
                    vm.noticias = response;
                });
            };
        },
        templateUrl: 'templates/home.html'
    });
})();