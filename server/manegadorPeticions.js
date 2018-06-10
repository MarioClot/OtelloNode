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
var Jugador = require("../model/jugador").Jugador;
var Partida = require("../model/partida").Partida;
var Peça = require("../model/peça").Peça;
var Posicio = require("../model/posicio").Posicio;
var fs = require('fs');
var querystring = require("querystring");
var path = require('path');

var ruta = "";
var jugadors = [];
var partides = [];
var usuari_logat = false;
var jugadors_senars = false;
var partida;

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

    function carregarLogin() {
        console.log("manegador de la petició 'login' s'ha cridat.");
        Utility.loadResources(response, "html/login.html", 200, 'text/html');
    }

    if ((user_registre !== undefined) && (password_registre !== undefined)) {
        Utility.consultarUsuariMongoDB(user_registre, password_registre, function (err, result) {
            if (!result) {
                Utility.registrarUsuariMongoDB(user_registre, password_registre, function (err, result) {
                    console.log(result);
                });
            } else {
                console.log("Usuari prèviament registrat");
            }
        });
        carregarLogin();
    }
    else if ((user_login !== undefined) && (password_login !== undefined)) {
        Utility.loginUsuariMongoDB(user_login, password_login, function (err, result) {
            if (result) {
                var jugador = new Jugador(user_login, password_login);
                usuari_logat = true;
                jugadors.push(jugador);
                response.writeHead(302, {
                    Location: "/partida"
                });
                response.end();
                
            } else {
                console.log("Login incorrecte");
                carregarLogin()
            }
        });
    } else {
        carregarLogin();
    }
    

}

function partida(response, consulta, post) {
    console.log("manegador de la petició 'partida' s'ha cridat.");
    if (usuari_logat){
        usuari_logat=false;
        Utility.loadResources(response, "html/partida.html", 200, 'text/html');
        if (jugadors.length % 2) {
            jugadors_senars = true;
        } else {
            console.log("jugadors parells");
            jugadors_senars = false;
            partida = new Partida(jugadors[jugadors.length - 1], jugadors[jugadors.length - 2]);
            partides.push(partida);
            console.log(partida.jugador1.email+" "+partida.jugador2.email);
            partida.crearPartida();
        }

    } else {
        response.writeHead(302, {
            Location: "/login"
        });
        response.end();
    } 
}

function taulell(response, consulta) {
    console.log("manegador de la petició 'taulell' s'ha cridat.");
    response.writeHead(200, {
        "Content-Type": "text/plain; charset=utf-8"
    });
    if (jugadors_senars){
        console.log(consulta);
    } else {
        // var taulell_actual = partida.taulell.getPeces();
        // for (var i = 0; i < taulell_actual.length; i++){
        //     var obj = taulell_actual[i];
        //     for (var key in obj){
        //         if (key == "imatge"){
        //             var attrNameImatge = key;
        //             var attrValueImatge = obj[attrNameImatge];
        //             // console.log(attrValueImatge);
        //         } if (key == "posicio") {
        //             var attrNamePosicio = key;
        //             var attrValuePosicio = obj[attrNamePosicio];
        //             console.log(attrValuePosicio);
        //             for (var posicio in attrValuePosicio) {
        //                 if (posicio == "x"){
        //                     var attrNameX = posicio;
        //                     var attrValueX = attrValuePosicio[attrNameX];
        //                     console.log(attrValueX);
        //                 } if (posicio == "y"){
        //                     var attrNameY = posicio;
        //                     var attrValueY = attrValuePosicio[attrNameY];
        //                     console.log(attrValueY);
        //                     ////
        //                     var value = attrValueX + "," + attrValueY;
        //                     var posicio = value.split(",")
        //                     // console.log("posicio x: " + posicio[0]);
        //                     // console.log("posicio y: " + posicio[1]);
        //                     /////
        //                     response.write("cell_" + posicio[0] + "_" + posicio[1]);
        //                 }
        //             }
        //         } 
        //     }
        // }
        //console.log(JSON.stringify(taulell_actual, null, 4));
        // console.log(partida.taulell.getPeces());
        var posicio = new Posicio(consulta.x, consulta.y);
        var peça = new Peça("blanca", posicio);
        partida.taulell.setPeça(peça);
        console.log("Penis: "+JSON.stringify(partida.taulell.getPeces()));
        response.write(JSON.stringify(partida.taulell.getPeces()));
        response.end();
    }
}

function css(response) {
    console.log("manegador de la petició 'css' s'ha cridat.");
    Utility.loadResources(response, "css/style.css", 200, 'text/css');
}

function scriptLogin(response) {
    console.log("manegador de la petició 'login.js' s'ha cridat.");
    Utility.loadResources(response, "script/login.js", 200, 'text/javascript');
}

function scriptPartida(response) {
    console.log("manegador de la petició 'partida.js' s'ha cridat.");
    Utility.loadResources(response, "script/partida.js", 200, 'text/javascript');
}

function othelloLogo(response) {
    console.log("manegador de la petició 'othelloLogo' s'ha cridat.");
    Utility.loadResources(response, "images/othello.svg", 200, 'image/svg+xml');
}

function error400(response) {
    Utility.loadResources(response, "html/error400.html", 400, 'text/html');
}

function ajax(response, consulta) {
    console.log("manegador de la petició 'ajax' s'ha cridat.");
    response.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
    });

    fs.readFile('./ajax.js', function (err, sortida) {
        response.writeHead(200, {
            'Content-Type': 'applicaction/javascript'
        });
        response.write(sortida);
        response.end();
    });
}

exports.inici = inici;
exports.login = login;
exports.partida = partida;
exports.taulell = taulell;
exports.css = css;
exports.scriptLogin = scriptLogin;
exports.scriptPartida = scriptPartida;
exports.othelloLogo = othelloLogo;
exports.error400 = error400;
exports.ajax = ajax;


