const fs = require('fs')

const fileName = 'fecha.txt'
const currentDatte = new Date().toLocaleDateString()

fs.writeFile(fileName,currentDatte, (error)=>{
    if(error) throw new error;
    console.log(`Archivo ${fileName} creado`)

    fs.readFile(fileName,'utf-8', (error, data) =>{
        if(error) throw new error;
        console.log(`contenido del archivo ${fileName}`);
        console.log(data);
    });

});