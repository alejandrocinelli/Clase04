const Contenedor = require('./contenedor.js');

// datos 

const item1 = {
    title: "Escuadra",
    price: 123.45,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
}

const item2 = {
    title: "Calculadora",
    price: 234.56,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
}
  
const item3 ={
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
}

const item4 = {
    title: "Escuadra",
    price: 12343,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
}

async function main() {

    // instanciamos el contenedor 
    const contenedor = new Contenedor('./productos.txt');
    
    // verificamos que el archivo este vacio 
    let datos = await contenedor.getAll();
    console.log(datos);
    
    // guardamos los datos del objeto item1 y le sumamos el id
    let id1 = await contenedor.save(item1); 
    console.log(id1);

    // guardamos los datos del objeto item2 y le sumamos el id
    let id2 = await contenedor.save(item2);
    console.log(id2);
    
    // item repetido descomentar para ver el error
    //let id3 = await contenedor.save(item4);
    //console.log(id3);

    let datos2 = await contenedor.getAll();
    console.log(datos2);

    // buscar por id 1 
    let id2Buscado = await contenedor.getById(1);
    console.log(id2Buscado);
  
    // pasamos un id que no existe
    let id3Buscado = await contenedor.getById(30);
    console.log(id3Buscado); 

    // delete por id 1 
    await contenedor.deleteById(1);
    let borrado1 = await contenedor.getAll();
    console.log(borrado1);

    // delete all -- comentar para no borrar todo 
    await contenedor.deleteAll();
    let borrado2 = await contenedor.getAll();
    console.log(borrado2);

}

main();