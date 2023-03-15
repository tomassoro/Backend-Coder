//Desafio entregable: Clases con ECMAScript y ECMAScript avanzado
class ProductManager {      
    constructor(products) {
        this.products = products;
    }

    addProduct(product) {
        const existingProduct = this.products.find(p => p.code === product.code);
        if (existingProduct) {
            throw new Error(`El producto con el codigo: '${product.code}' ya existe`);
        }
        this.products.push(product);
    }
    getProductById(id) {
        const product = this.products.find(p => p.code === id);
        if (!product) {
            throw new Error(`El producto con el codigo'${id}' no fue encontrado`);
        }
        return product;
        }
    getProducts(){
        return this.products;
    }
}

const products = [
    {
        title: "Product 1",
        description: "desc product1",
        price: 10,
        thumbnail: "sin imagen",
        code: "P1",
        stock: 100,
    },
    {
        title: "Product 2",
        description: "desc product2",
        price: 120,
        thumbnail: "sin imagen",
        code: "P2",
        stock: 50,
    },
];
const productManager = new ProductManager(products);

const newProduct = {
    title: "New product",
    description: "desc product3",
    price: 15,
    thumbnail: "sin imagen",
    code: "P4", // code already exists
    stock: 200,
};

try {
    productManager.addProduct(newProduct);
    console.log("Product added successfully");
} catch (error) {
    console.error(error.message);
}
const productsList = productManager.getProducts();
console.log(productsList)