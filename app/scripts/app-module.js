(function () {
    'use strict';

    var appModule = angular.module('gfpApp', ['ui.router', 'ngMessages', 'ngStorage']);

    //appModule.value('apiBase', 'http://localhost:8080/api/');

    appModule.config(function ($stateProvider, $urlRouterProvider) {
        var states = [
            {
                name: 'painel',
                url: '/painel',
                templateUrl: 'templates/collapsed-sidebar.html'
            },
            {
                name: 'home',
                url: '/home',
                template: '<home></home>'
            },
            {
                name: 'registro',
                url: '/registro',
                template: '<registro></registro>'
            },
            {
                name: 'login',
                url: '/login',
                template: '<login></login>'
            },
            {
                name: 'logout',
                url: '/logout',
                template: '<logout></logout>'
            },
            {
                name: 'lacamento2',
                url: '/lacamento',
                template: '<lancamento></lancamento>'
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
                name: 'noticia2',
                url: '/noticia',
                template: '<noticia></noticia>'
            },
            {
                name: 'noticia',
                url: '/noticia/{Id}',
                resolve: {
                    Id: function ($stateParams) {
                        return $stateParams.Id;
                    }
                },
                template: '<noticia noticia-id="$resolve.Id"></noticia>'
            },
            {
                name: 'categoria2',
                url: '/categoria',
                template: '<categoria></categoria>'
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

        $urlRouterProvider.otherwise('/home');

        states.forEach(function (state) {
            $stateProvider.state(state);
        });
    });
})();