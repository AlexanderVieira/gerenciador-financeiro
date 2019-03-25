(function () {
    'use strict';

    angular.module('gfpApp')
        .factory('noticiaService', ['$http', '$q', '$log', noticiaService]);

    function noticiaService($http, $q, $log) {

        var key = "noticias";
        let n = localStorage.getItem(key);
        if (n != null) {
            this.noticias = angular.fromJson(n);
        }

        return {
            getAll: getAll,
            add: add,
            remove: remove
        };

        function getAll() {
            var deferred = $q.defer();
            return $http.get('data/gfp.json')
                .then(function (response) {
                    let noticias = response.data;
                    deferred.resolve(noticias);
                    return deferred.promise;
                })
                .catch(function (response) {
                    $log.error('Error retrieving news: ' + response.statusText);
                    return $q.reject('Error retrieving news.');
                })
        }

        function add(noticia, list) {

            var add = true;
            for (let item of list) {

                if (item === noticia) {
                    add = false;
                    break;
                }
            }

            if (add) {
                list.push(noticia);
                console.log(list);
            }
            localStorage.setItem(key, angular.toJson(list));
        }

        function remove(noticia, list) {

            let myCategory = noticia;

            /*var index = list.indexOf(category);
            if (index != -1) {
                list.splice(index, 1)
            }*/

            angular.forEach(list, function (noticia, index) {
                if (noticia.titulo === myCategory){
                    list.splice(index, 1);
                }
            });
            localStorage.setItem(key, angular.toJson(list));

        }

    }

}());