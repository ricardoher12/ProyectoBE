//import { isUndefined } from "util";
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/Comida_Rapida';
const dbName = "Comida_Rapida";
const collectionName = "Pizza";
var db;
var collection;

MongoClient.connect(url, {useNewUrlParser: true, poolSize:10}).then(client =>{
    db = client.db(dbName);
    collection = db.collection(collectionName);
}).catch(error => {
    // listen for the signal interruption (ctrl-c)
  process.on('SIGINT', () => {
    console.log("adios");
    db.close();
    process.exit();
  });
})



class Pizza {
    constructor (id, nombre, forma,  size, ingredientes,  orilla)
    {
        this.id = id;
        this.nombre = nombre;
        this.forma = forma;
        this.size = size;
        this.ingredientes = ingredientes;
        this.orilla = orilla;
    }

}

class Response {
    constructor(code, isSuccessful, data){
        this.code = code;
        this.isSuccessful = isSuccessful;
        this.data = data;
    }
}

var pizzas = new Map();


exports.CargarData = function(){
    pizzas.set("11", new Pizza('11', 'Mr. Nice', 'Redonda', 'Grande', 'Salsa, queso, tomate, cebolla',  "Si" ));
    pizzas.set('12', new Pizza( '12',  'Narco',   'Redonda', 'Grande',  'Salsa, queso, tomate, cebolla', "Si" ))
    pizzas.set("13", new Pizza('13',  'Bombasto',   'Redonda', 'Grande',  'Salsa, queso, tomate, cebolla', "Si" ))
    pizzas.set("14",new Pizza('14',  'Celeritas',   'Redonda', 'Grande',  'Salsa, queso, tomate, cebolla',  "Si"));
    pizzas.set("15", new Pizza('15',  'Magneta',   'Redonda', 'Grande',  'Salsa, queso, tomate, cebolla',  "Si"));
    pizzas.set("16",new Pizza('16',  'RubberMan',  'Redonda', 'Grande',  'Salsa, queso, tomate, cebolla',  "Si"));
    pizzas.set("17",new Pizza('17',  'Dynama',  'Redonda', 'Grande',  'Salsa, queso, tomate, cebolla',  "Si"));
    pizzas.set("18",new Pizza( '18',  'Dr IQ',   'Redonda', 'Grande',  'Salsa, queso, tomate, cebolla',  "Si"));
    
}


exports.Get =  function(){
   try {
    return collection.find({}).toArray(); 
   } catch (error) {
       return Promise.reject(error);
   }
        
};



exports.GetID = function (id){
    try {
        return collection.findOne({"_id" : id});
    } catch (error) {
        return Promise.reject(error);
    }
};



exports.Delete =  function(id){
    try {
        return  collection.deleteOne({"_id" : id});
    } catch (error) {
        return Promise.reject(error);
    }
    
};


exports.Post = function (item){
    try {
        datos = JSON.parse(item.data);
        var newPizza = {_id : datos._id, nombre : datos.nombre, forma : datos.forma, size: datos.size, ingredientes : datos.ingredientes, orilla: datos.orilla}
        return collection.insertOne(newPizza); 

    } catch (error) {
        return Promise.reject(error);
    }
    
      
};

exports.Put = function (dato){
    try {
        item = JSON.parse(dato.data);
        var newValues= {$set: {nombre: item.nombre, forma: item.forma, size: item.size, ingredientes: item.ingredientes, orilla : item.orilla}};
        var query = {_id: item._id};
        return collection.updateOne(query, newValues);
    } catch (error) {
        return Promise.reject(error);
    }
 
    
};

 