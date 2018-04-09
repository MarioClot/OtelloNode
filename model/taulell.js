class Taulell{

    constructor(){
        this.peces = [];
        
    }

    setPeça(peça) {
        this.peces.push(peça);
    }

    getPeces() {
        return this.peces;
    }
}

exports.Taulell = Taulell;