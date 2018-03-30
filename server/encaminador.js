/*
 * Encaminador de peticions 
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
function encaminar(manegadorPeticions, pathname, consulta, response, post) {
    console.log('preparat per encaminar una petició a ...' + pathname);
    if (typeof manegadorPeticions[pathname] === 'function') {
        return manegadorPeticions[pathname](response, consulta, post);
    }else {
        console.log("No s'ha trobat manegador per a " + pathname);
        return manegadorPeticions["error"](response);
    }
}
  
  exports.encaminar = encaminar;