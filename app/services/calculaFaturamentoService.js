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
            calcularFaturamentoAbril: calcularFaturamentoAbril,
            calcularFaturamentoMarco: calcularFaturamentoMarco,
            calcularFaturamentoJaneiro: calcularFaturamentoJaneiro,
            calculaProjecaoFaturamento: calculaProjecaoFaturamento,
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
                //console.log(data.getMonth());
                if ( data.getMonth() === 4 && item.receita === true) {
                    newLancamentos.push(item);
                }
            }
            //console.log(newLancamentos);

            var resultadoMensal = 0.0;
            var resultadoDiario = 0.0;
            var resultadoAnual = 0.0;


            for (var j = 0; j < newLancamentos.length; j++) {
                var item1 = newLancamentos[j];
                //console.log(item1);

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
            //console.log(resultadoMensal);
            //console.log(resultadoDiario);
            //console.log(resultadoAnual);

            var receita = resultadoMensal + resultadoDiario + resultadoAnual;
            var despesa = 0.0;
            var saldoMaio2017 = receita - despesa;

            var objMaio2017 = {'receita': receita,'saldoMaio2017': saldoMaio2017};

            return objMaio2017;
        }

        function calcularFaturamentoAbril(){

            obterLancamentos();

            var lancamentos = angular.fromJson(localStorage.getItem(key));

            lancamentos.sort(function(a,b) {
                return a.data > b.data ? -1 : a.data < b.data ? 1 : 0;
            });

            var resultadoReceitaMensal = 0.0;
            var resultadoReceitaSemanal = 0.0;

            var resultadoDespesaMensal = 0.0;
            var resultadoDespesaDiaria = 0.0;

            var receitas = [];
            var despesas = [];
            for (var i = 0; i < lancamentos.length; i++) {
                var item = lancamentos[i];
                var data = new Date(item.data);
                //console.log(data.getMonth());
                if ( data.getMonth() === 3 && item.receita === true) {

                    receitas.push(item);
                }
                if(data.getMonth() === 3 && item.receita === false){

                    despesas.push(item);
                }
            }

            for (var j = 0; j < receitas.length; j++) {
                let item1 = receitas[j];
                // console.log(item1);

                if (item1.repeticoes === 7 && item1.repetitividade === 'mensal') {
                    resultadoReceitaMensal += item1.valor * item1.repeticoes;
                }
                if(item1.repeticoes === 2 && item1.repetitividade === 'semanal'){
                    resultadoReceitaSemanal += (item1.valor * item1.repeticoes) * 4;
                }
            }

            /*console.log('Resultado Mensal | Receitas: ' + resultadoReceitaMensal);
            console.log('Resultado Diário | Receitas: ' + resultadoReceitaSemanal);*/

            for (var k = 0; k < despesas.length; k++) {
                let item1 = despesas[k];

                if (item1.repeticoes === 3 && item1.repetitividade === 'mensal') {
                    resultadoDespesaMensal += item1.valor * item1.repeticoes;
                }
                if(item1.repeticoes === 6 && item1.repetitividade === 'diária'){
                    resultadoDespesaDiaria += (item1.valor * item1.repeticoes) * 30;
                }
            }

            /*console.log('Resultado Mensal | Despesas: ' + resultadoDespesaMensal);
            console.log('Resultado Diário | Despesas: ' + resultadoDespesaDiaria);*/

            var receita = resultadoReceitaMensal + resultadoReceitaSemanal;
            var despesa = resultadoDespesaMensal + resultadoDespesaDiaria;
            var saldoAbril2017 = receita - despesa;

            var objAbril2017 = {'receita': receita, 'despesa': despesa,'saldoAbril2017': saldoAbril2017};
            // console.log(objAbril2017);

            return objAbril2017;
        }

        function calcularFaturamentoMarco(){

            obterLancamentos();

            var lancamentos = angular.fromJson(localStorage.getItem(key));

            lancamentos.sort(function(a,b) {
                return a.data > b.data ? -1 : a.data < b.data ? 1 : 0;
            });

            var resultadoReceitaDiaria = 0.0;
            var resultadoReceitaAnual = 0.0;
            var despesa = 0.0;

            var receitas = [];
            for (var i = 0; i < lancamentos.length; i++) {
                var item = lancamentos[i];
                var data = new Date(item.data);
                //console.log(data.getMonth());
                if ( data.getMonth() === 2 && item.receita === true) {

                    receitas.push(item);
                }
            }

            for (var j = 0; j < receitas.length; j++) {
                let item1 = receitas[j];
                // console.log(item1);

                if(item1.repeticoes === 1 && item1.repetitividade === 'diária'){
                    resultadoReceitaDiaria += (item1.valor * item1.repeticoes) * 30;
                }
                if(item1.repeticoes === 3 && item1.repetitividade === 'anual'){
                    resultadoReceitaAnual += (item1.valor * item1.repeticoes) / 12;
                }
            }

            /*console.log('Resultado Anual | Receitas: ' + resultadoReceitaAnual);
            console.log('Resultado Diário | Receitas: ' + resultadoReceitaDiaria);*/

            var receita = resultadoReceitaDiaria + resultadoReceitaAnual;
            var saldoMarco2017 = receita - despesa;

            var objMarco2017 = {'receita': receita, 'saldoMarco2017': saldoMarco2017};
            // console.log(objMarco2017);

            return objMarco2017;
        }

        function calcularFaturamentoJaneiro(){

            obterLancamentos();

            var lancamentos = angular.fromJson(localStorage.getItem(key));

            lancamentos.sort(function(a,b) {
                return a.data > b.data ? -1 : a.data < b.data ? 1 : 0;
            });

            var resultadoReceitaAnual = 0.0;
            var despesa = 0.0;

            var receitas = [];
            for (var i = 0; i < lancamentos.length; i++) {
                var item = lancamentos[i];
                var data = new Date(item.data);
                //console.log(data.getMonth());
                if ( data.getMonth() === 0 && item.receita === true) {

                    receitas.push(item);
                }
            }

            for (var j = 0; j < receitas.length; j++) {
                let item1 = receitas[j];
                // console.log(item1);
                if(item1.repeticoes === 9 && item1.repetitividade === 'anual'){
                    resultadoReceitaAnual += (item1.valor * item1.repeticoes) / 12;
                }
            }

            console.log('Resultado Anual | Receitas: ' + resultadoReceitaAnual);

            var receita = resultadoReceitaAnual;
            var saldoJaneiro2017 = receita - despesa;

            var objJaneiro2017 = {'receita': receita, 'saldoJaneiro2017': saldoJaneiro2017};
            console.log(objJaneiro2017);

            return objJaneiro2017;
        }

        function calculaProjecaoFaturamento() {

            var objJaneiro2017 = calcularFaturamentoJaneiro();
            var objMarco2017 = calcularFaturamentoMarco();
            var objAbril2017 = calcularFaturamentoAbril();
            var objMaio2017 = calcularFaturamentoMaio();

            var projecao = (objJaneiro2017.saldoJaneiro2017 + objMarco2017.saldoMarco2017
            + objAbril2017.saldoAbril2017 + objMaio2017.saldoMaio2017) / 4;

            console.log(projecao);

            return projecao;
        }
    }
})();