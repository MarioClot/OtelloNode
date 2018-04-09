/*
 * arxiu principal que arrenca el servidor HTTP
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
"use strict";
var server = require("./server");
var encaminador = require("./encaminador");
var manegadorPeticions = require("./manegadorPeticions");

// instancia d'objecte manegadors. En temps d'execució puc afegir propietats i mètodes. 
// Afegeixo propietats com les claus ["/"]
var manegadors = {};
manegadors["/"] = manegadorPeticions.inici;
manegadors["/login"] = manegadorPeticions.login;
manegadors["/css"] = manegadorPeticions.css;
manegadors["/login.js"] = manegadorPeticions.scriptLogin;
manegadors["/othelloLogo"] = manegadorPeticions.othelloLogo;
manegadors["error"] = manegadorPeticions.error400;
manegadors["/ajax.js"] = manegadorPeticions.ajax;
manegadors["/partida"] = manegadorPeticions.partida;
manegadors["/taulell"] = manegadorPeticions.taulell;
manegadors["/partida.js"] = manegadorPeticions.scriptPartida;

server.iniciar(encaminador.encaminar, manegadors);