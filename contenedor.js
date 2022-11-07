const fs = require('fs');

class Contenedor {
    
    //constructor recibe el nombre del archivo ... productos.txt 

    constructor(ruta){
        this.ruta = ruta;   
    }

    async save(obj){
        // obtenemos todo los objetos 
        const listado = await this.getAll();
        // identificamos el ultimo id y lo incrementamos en 1
        let nuevoId = listado.length + 1;

        //SI existe el producto no agregar nada
        if(listado.length > 0 && listado.some((el) => el.title === obj.title))
        {
            console.log("El producto ya se encuentra en el catalogo");
            return
        }


        if(listado.length === 0 ){
            nuevoId = 1;
        }
        else{
            nuevoId = listado[listado.length - 1].id + 1;
        }
       // asignar el id al objeto que se va a guardar

       const nuevoObjConId = {
        ...obj,id: nuevoId
       }

       // insertar mi objeto al listado 
        listado.push(nuevoObjConId);

        // guardamos usando FS  
        
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(listado, null, 2));
            return nuevoId;
        }
        catch (error) {
            console.log('Error en save', error);
        }

    }

    // funcion para obtener todos los objetos
    async getAll() {
        try {
            const data = await fs.promises.readFile(this.ruta, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    // funcion para obtener un objeto por id
    async getById(id) {
        try {
        const listado = await this.getAll();
        return listado.find((obj) => obj.id === id) ?? null;
        }
        catch (error) {
            console.log('Error en getById', error);
            //validar dead code 
        }
        
    }

    // funcion para borrar todos los objetos

    async deleteAll() {
        try {
        await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2));
        } catch (error) {
            console.log('Error en deleteAll', error);
        }
    }


    async deleteById(id) {
        try {
        const listado = await this.getAll();
        const listadoFiltrado = listado.filter((obj) => obj.id !== id);
        await fs.promises.writeFile(this.ruta, JSON.stringify(listadoFiltrado, null, 2));
        } catch (error) {
            console.log('Error en deleteById', error);
        }
    }
   
 
}

module.exports = Contenedor;
