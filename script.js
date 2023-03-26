//Desafio entregable: Clases con ECMAScript y ECMAScript avanzado

const fs = require('fs').promises

class ProductManager{

    idAuto = 1;
    #products = [];
    path = ``; 

    constructor(){
        this.#products = [];
        this.path = `./product1.json`
    }

    async getProduct(){
        try{
            const productFile = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(productFile)
        }
        catch(e){
            throw new Error
        }
    }


}

