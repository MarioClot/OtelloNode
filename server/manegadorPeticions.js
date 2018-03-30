/*
 * Manegador  de peticions.
 * 1. server -> gestiona posar-se en marxa.
 * 2. routing -> és l'enrutament o encaminament.
 * 3. manegador de peticions -> la lògica està aquí
 * @author Carlos Rodero
 * @author Mario Recamales
 * @version 1.0
 * date 03/2018
 * format del document UTF-8
 *
 * Projecte M06UF4. Comunicació asíncrona client-servidor.
 * 4.1 Node.JS
 * 4.2 Ajax
 * 4.3 MongoDB
 */
'use strict';
var Utility = require("../utility/utility");
var fs = require('fs');
var querystring = require("querystring");
var path = require('path');
var ruta = "";

function inici(response) {
    console.log("manegador de la petició 'iniciar' s'ha cridat.");
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    response.write("Hola iniciar");
    response.end();
}

function login(response, consulta, post) {
    var user_registre = querystring.parse(post)['email_registre'];
    var password_registre = querystring.parse(post)['password_registre'];
    var user_login = querystring.parse(post)['email_login'];
    var password_login = querystring.parse(post)['password_login'];

    function carregarLogin(){
        console.log("manegador de la petició 'login' s'ha cridat.");
        Utility.loadResources(response, "html/login.html", 200, 'text/html');
    }

    if ((user_registre !== undefined) && (password_registre !== undefined)){
        Utility.consultarUsuariMongoDB(user_registre, password_registre, function(err, result){
            if (!result){
                Utility.registrarUsuariMongoDB(user_registre, password_registre, function(err, result){
                    console.log(result);
                });
            }else{
                console.log("Usuari prèviament registrat");   
            }
        });
        carregarLogin();
    }
    else if ((user_login !== undefined) && (password_login !== undefined)){
        Utility.loginUsuariMongoDB(user_login, password_login, function(err, result){
            if (result){
                response.writeHead(302,  {
                    Location: "/partida"
                });
                response.end();
            }else{
                console.log("Login incorrecte");
                carregarLogin()
            }
        });
    }else{
        carregarLogin();
    }

}

function partida(response, consulta, post){
    console.log("manegador de la petició 'partida' s'ha cridat.");
    Utility.loadResources(response, "html/partida.html", 200, 'text/html');
}

function css(response) {
    console.log("manegador de la petició 'css' s'ha cridat.");
    Utility.loadResources(response, "css/style.css", 200, 'text/css');
}

function othelloLogo(response) {
    console.log("manegador de la petició 'othelloLogo' s'ha cridat.");
    Utility.loadResources(response, "images/othello.svg", 200, 'image/svg+xml');
}

function error400(response) {
    Utility.loadResources(response, "html/error400.html", 400, 'text/html');
}

exports.inici = inici;
exports.login = login;
exports.partida = partida;
exports.css = css;
exports.othelloLogo = othelloLogo;
exports.error400 = error400;


