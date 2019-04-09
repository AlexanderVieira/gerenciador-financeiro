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

            var lancamentos = angular.fromJson(localStorage.getItem(key));

            lancamento.id = lancamentos.length + 1;
            let index = lancamentos.findIndex(c => c.id === lancamento.id);
            console.log(index);
            if(index < 0) {
                lancamentos.push(lancamento);
                localStorage.setItem(key, angular.toJson(lancamentos));
                return angular.fromJson(localStorage.getItem(key));
            }

        }

        function remove(lancamentoId) {

            var lancamentos = angular.fromJson(localStorage.getItem(key));

            if (lancamentoId != null){
                let index = lancamentos.findIndex(c => c.id === lancamentoId);
                console.log(index);
                lancamentos.splice(index, 1);
                localStorage.setItem(key, angular.toJson(lancamentos));
                return angular.fromJson(localStorage.getItem(key));
            }
        }

        function update(lancamento) {

            var lancamentos = angular.fromJson(localStorage.getItem(key));

            if (lancamento.id != null){

                let index = lancamentos.findIndex(c => c.id === lancamento.id);
                var obj = lancamentos[index];
                obj.nome = lancamento.nome;
                obj.descricao = lancamento.descricao;
                obj.valor = lancamento.valor;
                obj.receita = lancamento.receita;
                obj.categoria = lancamento.categoria;
                obj.data = lancamento.data;
                obj.repeticoes = lancamento.repeticoes;
                obj.repetitividade = lancamento.repetitividade;
                localStorage.setItem(key, angular.toJson(lancamentos));
                return angular.fromJson(localStorage.getItem(key));
            }

        }

    }
})();