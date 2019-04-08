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
            remove: remove,
            update: update
        };

        function getAll() {
            var deferred = $q.defer();
            return $http.get('data/lancamentos.json')
                .then(function (response) {
                    let lancamentos = response.data;
                    localStorage.setItem(key, angular.toJson(lancamentos));
                    deferred.resolve(lancamentos);
                    return deferred.promise;
                })
                .catch(function (response) {
                    $log.error('Error retrieving lancamentos: ' + response.statusText);
                    return $q.reject('Error retrieving lancamentos.');
                })
        }

        function add(lancamento) {

            let lancamentoStorage = localStorage.getItem(key);
            var lista = angular.fromJson(lancamentoStorage);

            if (lancamento.id === null){

                lancamento.id = lista.length + 1;
                let index = lista.findIndex(c => c.id === lancamento.id);
                console.log(index);
                if(index < 0) {
                    lista.push(lancamento);
                }
            }
            localStorage.setItem(key, angular.toJson(lista));
        }

        function remove(lancamentoId) {

            let lancamentoStorage = localStorage.getItem(key);
            var lista = angular.fromJson(lancamentoStorage);

            if (lancamentoId != null){
                let index = lista.findIndex(c => c.id === lancamentoId);
                console.log(index);
                lista.splice(index, 1);
            }
            localStorage.setItem(key, angular.toJson(lista));
        }

        function update(lancamento) {

            let lancamentoStorage = localStorage.getItem(key);
            var lista = angular.fromJson(lancamentoStorage);

            if (lancamento.id != null){

                let index = lista.findIndex(c => c.id === lancamento.id);
                var obj = lista[index];
                obj.nome = lancamento.nome;
                obj.descricao = lancamento.descricao;
                localStorage.setItem(key, angular.toJson(lista));
            }

        }

    }
})();