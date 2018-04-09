var Taulell = require("../model/taulell").Taulell;
var Peça = require("../model/peça").Peça;
var Posicio = require("../model/posicio").Posicio;

class Partida{

    constructor(jugador1, jugador2){
        this.taulell = new Taulell();
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
    }

    crearPartida () {
        var i = 0;
        var j = 0;
        var nombre_de_files = 8;
        var nombre_de_columnes = 8;

        for (i = 0; i < nombre_de_files; i++) {
            for (j = 0; j < nombre_de_columnes; j++) {
                var posicio = new Posicio(i, j);
                if ((i == 3) && (j == 3)){
                    var peça = new Peça("negra", posicio);
                    this.taulell.setPeça(peça);
                }
                if ((i == 4) && (j == 4)){
                    var peça = new Peça("negra", posicio);
                    this.taulell.setPeça(peça);
                }
                if ((i == 3) && (j == 4)){
                    var peça = new Peça("blanca", posicio);
                    this.taulell.setPeça(peça);
                }
                if ((i == 4) && (j == 3)){
                    var peça = new Peça("blanca", posicio);
                    this.taulell.setPeça(peça);
                }
            }
        }
    }

    toString () {
        console.log('Nom jugador1: '+ this.jugador1);
        console.log('Nom jugador2: '+ this.jugador2);
        console.log('Nom taulell: '+ this.taulell);
    }
}

exports.Partida = Partida;