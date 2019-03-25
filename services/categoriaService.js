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

        // let categories = [];

        return {
            getAll: getAll,
            add: add,
            remove: remove
        };

        function getAll() {
            var deferred = $q.defer();
            return $http.get('data/gfp.json')
                .then(function (response) {
                    let categorias = response.data;
                    deferred.resolve(categorias);
                    return deferred.promise;
                })
                .catch(function (response) {
                    $log.error('Error retrieving categories: ' + response.statusText);
                    return $q.reject('Error retrieving categories.');
                })
        }

        function add(categoria, list) {

            var add = true;
            for (let item of list) {

                if (item === categoria) {
                    add = false;
                    break;
                }
            }

            if (add) {
                list.push(categoria);
            }
            localStorage.setItem(key, angular.toJson(list));
        }

        function remove(categoria, list) {

            let myCategory = categoria;

            /*var index = list.indexOf(category);
            if (index != -1) {
                list.splice(index, 1)
            }*/

            angular.forEach(list, function (categoria, index) {
                if (categoria.name === myCategory){
                    list.splice(index, 1);
                }
            });
            localStorage.setItem(key, angular.toJson(list));

        }

    }

}());