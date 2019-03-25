(function () {
    'use strict';

    angular.module('gfpApp')
        .factory('lancamentoService', ['$http', '$q', '$log', lancamentoService]);

    function lancamentoService($http, $q, $log) {

        var key = "lancamentos";
        let l = localStorage.getItem(key);
        if (l != null) {
            this.lancamentos = angular.fromJson(l);
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
                    let lancamentos = response.data;
                    deferred.resolve(lancamentos);
                    return deferred.promise;
                })
                .catch(function (response) {
                    $log.error('Error retrieving launches: ' + response.statusText);
                    return $q.reject('Error retrieving launches.');
                })
        }

        function add(lancamento, list) {
            var add = true;
            for (let item of list.lancamentos) {

                if (item === lancamento) {
                    add = false;
                    break;
                }
            }

            if (add) {
                list.lancamentos.push(lancamento);
            }
            localStorage.setItem(key, angular.toJson(list));
        }

        function remove(lancamento, list) {

            let lanc = lancamento;

            /*var index = list.indexOf(lancamento);
            if (index != -1) {
                list.splice(index, 1)
            }*/

            angular.forEach(list.lancamentos, function (lancamento, index) {
                if (lancamento.id === lanc.id){
                    list.lancamentos.splice(index, 1);
                }
            });
            localStorage.setItem(key, angular.toJson(list));

        }

    }

}());