(function () {
    'use strict';

    angular.module('gfpApp')
        .factory('categoriaService', ['$http', '$q', '$log', categoriaService]);

    function categoriaService($http, $q, $log) {

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

            var categorias = angular.fromJson(localStorage.getItem(key));

            categoria.id = categorias.length + 1;
            let index = categorias.findIndex(c => c.id === categoria.id);
            console.log(index);
            if (index < 0) {
                categorias.push(categoria);
                localStorage.setItem(key, angular.toJson(categorias));
                return angular.fromJson(localStorage.getItem(key));
            }

        }

        function remove(categoriaId) {

            var categorias = angular.fromJson(localStorage.getItem(key));

            console.log(categoriaId);

            if (categoriaId != null){

                let index = categorias.findIndex(c => c.id === categoriaId);
                //var index = lista.indexOf(categoriaId);
                console.log(index);
                categorias.splice(index, 1);
                localStorage.setItem(key, angular.toJson(categorias));
                return angular.fromJson(localStorage.getItem(key));
            }

        }

        function update(categoria) {

            var categorias = angular.fromJson(localStorage.getItem(key));

            if (categoria.id != null){

                let index = categorias.findIndex(c => c.id === categoria.id);
                var obj = categorias[index];
                console.log(obj);
                obj.nome = categoria.nome;
                obj.descricao = categoria.descricao;
                localStorage.setItem(key, angular.toJson(categorias));
                return angular.fromJson(localStorage.getItem(key));
            }

        }

    }
})();