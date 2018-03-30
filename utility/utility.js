/*
 * Classe Utility
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
var querystring = require('querystring');
var fs = require('fs');
var path = require('path');
var assert = require('assert'); //utilitzem assercions
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

function loadResources(response, resource, status_code, content_type) {
    ruta = path.join(__dirname, '..', 'client/' + resource);
    fs.readFile(ruta, "utf8", function (err, sortida) {
        response.writeHead(status_code, {
            'Content-Type': content_type
        });
        response.write(sortida);
        response.end();
    });
}

function consultarUsuariMongoDB(user, password, callback) {
    var myobj = {'email': user };
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        //console.log("Connexió correcta");
        var dbo = db.db("daw2");
        dbo.collection("users").findOne(myobj, function (err, result) {
            if (err) throw err;
            //console.log(result);
            callback(null,result); 
            db.close();
        });
    });
}

function registrarUsuariMongoDB(usuari, password, callback) {
    var myobj = {'email': usuari, 'password': password };
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        //console.log("Connexió correcta");
        var dbo = db.db("daw2");
        dbo.collection("users").insertOne(myobj, function (err, res) {
            if (err) throw err;
            callback(null, "Usuari registrat correctament");
            db.close();
        });
    });
}

function loginUsuariMongoDB(user, password, callback) {
    var myobj = {'email': user, 'password': password };
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        //console.log("Connexió correcta");
        var dbo = db.db("daw2");
        dbo.collection("users").findOne(myobj, function (err, result) {
            if (err) throw err;
            //console.log(result);
            callback(null, result); 
            db.close();
        });
    });
}

function registrarUsuariJSON(usuari, password) {
    var is_registered = false;
    // Get Value from JSON
    var contents = fs.readFileSync("../data.json");
    var jsonContent = JSON.parse(contents);
    var user = jsonContent.users;
    // Comprovem si existeix usuari en data.json
    for (var i in user) {
        if (usuari == user[i].email) {
            is_registered = true;
        }
    }
    if (!is_registered) {
        jsonContent.users.push({ "email": usuari, "password": password });
        fs.writeFile('../data.json', JSON.stringify(jsonContent), function (err) {
            //console.log(err);
        });
        return true;
    } else {
        return false;
    }
}

function consultarUsuariJSON(usuari, password) {
    var is_login = false;
    // Get Value from JSON
    var contents = fs.readFileSync("../data.json");
    var jsonContent = JSON.parse(contents);
    var user = jsonContent.users;
    // Comprovem si coincideix usuari i contrassenya en data.json
    for (var i in user) {
        if ((usuari == user[i].email) && (password == user[i].password)) {
            is_login = true;
        }
    }
    if (is_login) {
        return true;
    } else {
        return false;
    }
}

exports.loadResources = loadResources;
exports.consultarUsuariMongoDB = consultarUsuariMongoDB;
exports.registrarUsuariMongoDB = registrarUsuariMongoDB;
exports.loginUsuariMongoDB = loginUsuariMongoDB;

exports.consultarUsuariJSON = consultarUsuariJSON;
exports.registrarUsuariJSON = registrarUsuariJSON;