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

            let noticiaStorage = localStorage.getItem(key);
            var lista = angular.fromJson(noticiaStorage);

            if (noticia.id === null){

                noticia.id = lista.length + 1;
                let index = lista.findIndex(n => n.id === noticia.id);
                console.log(index);
                if(index < 0) {
                    lista.push(noticia);
                }
            }
            localStorage.setItem(key, angular.toJson(lista));
        }

        function remove(noticiaId) {

            let noticiaStorage = localStorage.getItem(key);
            var lista = angular.fromJson(noticiaStorage);

            if (noticiaId != null){
                let index = lista.findIndex(c => c.id === noticiaId);
                console.log(index);
                lista.splice(index, 1);
            }
            localStorage.setItem(key, angular.toJson(lista));
        }

        function update(noticia) {

            let noticiaStorage = localStorage.getItem(key);
            var lista = angular.fromJson(noticiaStorage);

            if (noticia.id != null){

                let index = lista.findIndex(c => c.id === noticia.id);
                var obj = lista[index];
                obj.nome = noticia.nome;
                obj.descricao = noticia.descricao;
            }
            localStorage.setItem(key, angular.toJson(lista));
        }

    }
})();