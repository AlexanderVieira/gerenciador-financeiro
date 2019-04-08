(function () {
    'use strict';

    angular.module('gfpApp').factory('authService', ['$http', '$timeout', '$location', '$sessionStorage', 'userService', authService]);

    function authService($http, $timeout, $location, $sessionStorage, userService) {

        return {
            login: login,
            logout: logout
        };

        function login(userName, password) {

            $timeout(function () {

                var usuarios = [];

                userService.getAll()
                    .then(function (response){

                        usuarios = response;
                        for (let usuario of usuarios){

                            if (usuario.userName === userName && usuario.password === password){

                                $sessionStorage.isLogged = true;
                                response = {success: true};
                                $location.path('/home');
                                break;

                            } else{
                                response = {success: false, message: 'Nome de usuário ou senha inválido!'};
                            }
                        }
                    });
            }, 1000);

        }

        function logout() {
            //window.sessionStorage.setItem('ngStorage-isLogged', 'false');
            $sessionStorage.isLogged = false;
        }

        /*function setCredentials(userName, password) {
            var authData = Base64.encode(userName + ':' + password);

            $rootScope.globals = {
                currentUser:{
                    userName: userName,
                    authData: authData
                }
            };

            $http.defaults.headers.common['Authorization']= 'Basic' + authDate;

            var cookieExpiration = new Date();
            cookieExpiration.setDate(cookieExpiration.getDate() + 15);
            $cookies.putObject('globals', $rootScope.globals, { expires: cookieExpiration});
        }

        function clearCredentials() {
            $rootScope.globals = {};
            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }
    }*/

        /*var Base64 = {

            keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    window.alert("Havia caracteres base64 inválidos no texto de entrada.\n" +
                        "Os caracteres base64 válidos são A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Espere erros na decodificação.");
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                do {
                    enc1 = this.keyStr.indexOf(input.charAt(i++));
                    enc2 = this.keyStr.indexOf(input.charAt(i++));
                    enc3 = this.keyStr.indexOf(input.charAt(i++));
                    enc4 = this.keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";

                } while (i < input.length);

                return output;
            }*/
    }
})();