class Jugador{
    
    constructor(email, password, puntuacio){
        this.email = email;
        this.password = password;
        this.puntuacio = 0;
    }

    toString () {
        console.log('Nom del jugador: '+ this.email);
    }
}

exports.Jugador = Jugador;