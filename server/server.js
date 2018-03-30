/*
 * Servidor HTTP bàsic amb Node JS. 
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

var http = require('http');
var url = require("url");

function iniciar(encaminar, manegadorPeticions) {
	function onRequest(request, response) {
	// request està ple amb lo que li passem.
    // response està buit a esperes d'omplir-lo amb lo que necessitarem
    
        if (request.url != '/favicon.ico') {
            request.setEncoding("utf8");

            var pathname = url.parse(request.url).pathname;
		    var consulta = url.parse(request.url, true).query;
		    console.log("Petició per a  " + pathname + " rebuda.");

            // Codi per fer els post
            var post = "";
            request.addListener("data", function(dataPost) {
                post += dataPost;
		    });
            
            request.addListener("end", function() {
			encaminar(manegadorPeticions, pathname, consulta, response, post);
            });
        }
	}

	http.createServer(onRequest).listen(8888);
	console.log("Servidor iniciat.");
}
exports.iniciar = iniciar;