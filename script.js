//Desafio entregable: Clases con ECMAScript y ECMAScript avanzado

const fs = require('fs').promises

class ProductManager{

    idAuto = 1;
    #products = [];
    path = ``; 

    constructor(){
        this.#products = [];
        this.path = `./product.json`
    }
    async loadData(){
        const productFile = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(productFile)
    }
    async getProduct(){
        try{
            return this.loadData()
        }
        catch(e){
            await fs.writeFile(this.path, "[]");
            return('El archivo no existe. Se creó un array')
        }
        
    }
    async addProduct(product){
        try{   
            let newProduct =  await this.loadData()
             console.log(newProduct)
            const validation = newProduct.find(p => (p.id === product.id))
            if(validation){
                throw new Error('Se repitio el id o el code, el objeto no puede ser creado')
            }
            if(newProduct.length > 0 ){
                const lastProduct = newProduct[newProduct.length -1]
                this.idAuto = lastProduct.id + 1;
            }

            newProduct.push({id: this.idAuto++, ...product});
            await fs.writeFile(this.path, JSON.stringify(newProduct, null, 2));
            return 'Objeto creado correctamente'
        }    
        catch(e){
            throw new Error
        }
    }
    async getProductById(id){
        try{
            let findProd = await this.loadData()
            const idValidator = findProd.find(p => p.id === id)
    
            if(!idValidator){
                throw new Error('No se ha encontrado el producto')
            }
            return idValidator
        }
        catch(e){
            throw new Error(e)
        }
    }
    async updateProduct(id, product){
        try{
            let products = await this.loadData()
            const index = products.findIndex((p) => p.id === id);
            products.splice(index, 1,({id, ...product}))
            await fs.writeFile(this.path,JSON.stringify(products,null,2),'utf-8')
            return 'producto modificado'
        }
        catch(e){
            throw new Error('el id ingresado no corresponde con un producto existente')
        }
    }
    async deleteProduct(id){
        try{
            const products = await this.loadData()
            const productFilter = products.filter(p => p.id !== id)
            await fs.writeFile(this.path, JSON.stringify(productFilter, null, 2), 'utf-8')
            return 'Elemento borrado'
        }
        catch(e){
            throw new Error('el id no fue encontrado')
        }
    }

}
const pm = new ProductManager()
const oreos = {
    title:"oreos",
    description:"Galletitas rellenas con crema blanca",
    price: 5,
    thumbnail:"con foto",
    code:"adfg66",
    stock:5
}
const macucas = {
    title:"macucas",
    description:"Galletitas rellenas con crema blanca",
    price: 5,
    thumbnail:"con foto",
    code:"adfg66",
    stock:5
}
const main = async() => {
    console.log(await pm.getProduct())
    console.log(await pm.addProduct(oreos))
    console.log(await pm.addProduct(macucas))
    console.log(await pm.getProductById(1))
    console.log(await pm.deleteProduct(2))
    console.log(await pm.getProduct())
    console.log(await pm.updateProduct(1,{...oreos, code:"carpincho"}))
    console.log(await pm.getProduct())
    
};
main()

