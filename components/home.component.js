(function () {
    'use strict';

    angular.module('gfpApp').component('home', {
        controllerAs: 'vm',
        controller: function (noticiaService, $location) {

            var vm = this;
            vm.noticias = [];

            vm.$onInit = function () {
                noticiaService.getAll().then(function (response) {
                    vm.noticias = response;
                });

                vm.redirectTasks = function(){

                    $location.path("lancamentos");
                };

                vm.redirectCategories = function(){

                    $location.path("categorias");
                }
            };
        },
        templateUrl: 'templates/home.component.html'
    });
})();