(function () {
    'use strict';

    angular.module('gfpApp')
        .factory('calculaFaturamentoService', ['$http', '$q', '$log','$sessionStorage', 'lancamentoService', calculaFaturamentoService]);

    function calculaFaturamentoService($http, $q, $log, $sessionStorage, lancamentoService) {

        var key = "fat";
        let l = localStorage.getItem(key);
        if (l != null) {
            this.lancamentos = angular.fromJson(l);
        }

        return {
            calcularFaturamentoMaio: calcularFaturamentoMaio,
            obterLancamentos: obterLancamentos,
        };

        function obterLancamentos(){
            lancamentoService.getAll().then(function (response) {
                var lancamentos = response;
                localStorage.setItem(key, angular.toJson(lancamentos));
                //console.log(calcularFaturamento());
                //return lancamentos;
            });
        }

        function calcularFaturamentoMaio(){

            obterLancamentos();

            var lancamentos = angular.fromJson(localStorage.getItem(key));

            lancamentos.sort(function(a,b) {
                return a.data > b.data ? -1 : a.data < b.data ? 1 : 0;
            });

            var newLancamentos = [];
            for (var i = 0; i < lancamentos.length; i++) {
                var item = lancamentos[i];
                var data = new Date(item.data);
                console.log(data.getMonth());
                if ( data.getMonth() === 4 && item.receita === true) {
                    newLancamentos.push(item);
                }
            }
            console.log(newLancamentos);

            var resultadoMensal = 0;
            var resultadoDiario = 0;
            var resultadoAnual = 0;


            for (var j = 0; j < newLancamentos.length; j++) {
                var item1 = newLancamentos[j];
                console.log(item1);

                if (item1.repeticoes === 3 && item1.repetitividade === 'mensal') {
                    resultadoMensal += item1.valor * item1.repeticoes;
                }
                if(item1.repeticoes === 11 && item1.repetitividade === 'anual'){
                    resultadoAnual += (item1.valor * item1.repeticoes) / 12;
                }
                if(item1.repeticoes === 7 && item1.repetitividade === 'diária'){
                    resultadoDiario += (item1.valor * item1.repeticoes) * 30;
                }
            }
            console.log(resultadoMensal);
            console.log(resultadoDiario);
            console.log(resultadoAnual);

            var receita = resultadoMensal + resultadoDiario + resultadoAnual;
            var despesa = 0;
            var faturamentoMaio2017 = receita - despesa;

            var objFaturamentoMaio2017 = [{'receita': receita}, {'faturamentoMaio2017': faturamentoMaio2017}];

            return objFaturamentoMaio2017;
        }
    }
})();