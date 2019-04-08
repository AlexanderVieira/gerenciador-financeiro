(function () {
    'use strict';

    angular.module('gfpApp')
        .factory('categoriaService', ['$http', '$q', '$log', '$timeout', '$sessionStorage', categoriaService]);

    function categoriaService($http, $q, $log, $timeout, $sessionStorage) {

        var key = "categorias";
        let c = localStorage.getItem(key);
        if (c != null) {
            this.categorias = angular.fromJson(c);
        }

        return {
            getAll: getAll,
            add: add,
            remove: remove,
            update: update
        };

        function getAll() {
            var deferred = $q.defer();
            return $http.get('data/categorias.json')
                .then(function (response) {
                    let categorias = response.data;
                    localStorage.setItem(key, angular.toJson(categorias));
                    deferred.resolve(categorias);
                    return deferred.promise;
                })
                .catch(function (response) {
                    $log.error('Error retrieving categories: ' + response.statusText);
                    return $q.reject('Error retrieving categories.');
                })
        }

        function add(categoria) {

            let categoriaStorage = localStorage.getItem(key);
            var lista = angular.fromJson(categoriaStorage);

            if (categoria.id === null){

                console.log(categoria.id);

                categoria.id = lista.length + 1;
                let index = lista.findIndex(c => c.id === categoria.id);
                console.log(index);
                if (index < 0) {
                    lista.push(categoria);
                    localStorage.setItem(key, angular.toJson(lista));
                }
            }else{
                console.log(categoria.id);

                categoria.id = lista.length + 1;
                let index = lista.findIndex(c => c.id === categoria.id);
                console.log(index);
                if (index < 0) {
                    lista.push(categoria);
                    localStorage.setItem(key, angular.toJson(lista));
                }
            }

        }

        function remove(categoriaId) {

            let categoriaStorage = localStorage.getItem(key);
            var lista = angular.fromJson(categoriaStorage);

            console.log(categoriaId);

            if (categoriaId != null){
                let index = lista.findIndex(c => c.id === categoriaId);
                console.log(index);                
                lista.splice(index, 1);
                console.log(lista);
                localStorage.setItem(key, angular.toJson(lista));
            }

        }

        function update(categoria) {

            let categoriaStorage = localStorage.getItem(key);
            var lista = angular.fromJson(categoriaStorage);

            if (categoria.id != null){

                let index = lista.findIndex(c => c.id === categoria.id);
                var obj = lista[index];
                obj.nome = categoria.nome;
                obj.descricao = categoria.descricao;
                localStorage.setItem(key, angular.toJson(lista));
            }

        }

    }
})();