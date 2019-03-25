(function () {
    'use strict';

    var appModule = angular.module('gfpApp', ['ui.router', 'ngMessages']);

    appModule.value('apiBase', 'http://localhost:8080/api/');

    appModule.config(function ($stateProvider, $urlRouterProvider) {
        var states = [
            /*{
                name: 'home',
                url: '/noticia',
                templateUrl: 'templates/noticia.component.html'
            },*/
            {
                name: 'login',
                url: '/login',
                templateUrl: 'templates/login.component.html'
            },
            {
                name: 'conta',
                url: '/conta',
                templateUrl: 'templates/conta.component.html'
            },
            /*{
                name: 'categoria',
                url: '/categoria',
                templateUrl: 'templates/categoria.component.html'
            },*/
            {
                name: 'lacamento',
                url: '/lacamento',
                templateUrl: 'templates/lancamento.component.html'
            },
            {
                name: 'lancamento',
                url: '/lacamento/{Id}',
                resolve: {
                    Id: function ($stateParams) {
                        return $stateParams.Id;
                    }
                },
                template: '<lancamento lancamento-id="$resolve.Id"></lancamento>'
            },
            {
                name: 'home',
                url: '/noticia/{Id}',
                resolve: {
                    Id: function ($stateParams) {
                        return $stateParams.Id;
                    }
                },
                template: '<noticia noticia-id="$resolve.Id"></noticia>'
            },
            {
                name: 'categoria',
                url: '/categoria/{Id}',
                resolve: {
                    Id: function ($stateParams) {
                        return $stateParams.Id;
                    }
                },
                template: '<categoria categoria-id="$resolve.Id"></categoria>'
            },

        ];

        $urlRouterProvider.otherwise('/');

        states.forEach(function (state) {
            $stateProvider.state(state);
        });
    });
})();