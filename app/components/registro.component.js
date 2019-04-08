(function () {
    'use strict';

    angular.module('gfpApp').component('registro', {
        controllerAs: 'vm',
        controller: function ($location) {
            var vm = this;
            vm.userInfo = {};

            vm.$onInit = function(){

                vm.submit = function(userInfo) {
                    /*var name = userInfo.name;
                    var email = userInfo.email;
                    var password = userInfo.password;
                    var retypePassword = userInfo.retypepassword;*/
                    $location.path('/login');

                    //var registrado = $sessionStorage.isResgister;

                };
            };

        },
        templateUrl: 'templates/registro.html'
    });
})();