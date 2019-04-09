(function () {
    'use strict';

    angular.module('gfpApp')
        .factory('noticiaService', ['$http', '$q', '$log', noticiaService]);

    function noticiaService($http, $q, $log) {

        var key = "noticias";
        let m = localStorage.getItem(key);
        if (m != null) {
            this.noticias = angular.fromJson(m);
        }

        return {
            getAll: getAll,
            add: add,
            remove: remove,
            update: update
        };

        function getAll() {
            var deferred = $q.defer();
            return $http.get('data/noticias.json')
                .then(function (response) {
                    let noticias = response.data;
                    localStorage.setItem(key, angular.toJson(noticias));
                    deferred.resolve(noticias);
                    return deferred.promise;
                })
                .catch(function (response) {
                    $log.error('Error retrieving noticias: ' + response.statusText);
                    return $q.reject('Error retrieving noticias.');
                })
        }

        function add(noticia) {

            var noticias = angular.fromJson(localStorage.getItem(key));

            noticia.id = noticias.length + 1;
            let index = noticias.findIndex(n => n.id === noticia.id);
            console.log(index);
            if(index < 0) {
                noticias.push(noticia);
                localStorage.setItem(key, angular.toJson(noticias));
                return angular.fromJson(localStorage.getItem(key));
            }

        }

        function remove(noticiaId) {

            var noticias = angular.fromJson(localStorage.getItem(key));

            if (noticiaId != null){
                let index = noticias.findIndex(c => c.id === noticiaId);
                console.log(index);
                noticias.splice(index, 1);
                localStorage.setItem(key, angular.toJson(noticias));
                return angular.fromJson(localStorage.getItem(key));
            }
        }

        function update(noticia) {

            var noticias = angular.fromJson(localStorage.getItem(key));

            if (noticia.id != null){

                let index = lista.findIndex(c => c.id === noticia.id);
                var obj = lista[index];
                obj.titulo = noticia.titulo;
                obj.autor = noticia.autor;
                obj.data = noticia.data;
                obj.imagem = noticia.imagem;
                localStorage.setItem(key, angular.toJson(noticias));
                return angular.fromJson(localStorage.getItem(key));
            }
        }

    }
})();