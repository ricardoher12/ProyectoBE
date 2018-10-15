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
    dbClient.close();
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
    return collection.find({}).toArray();     
};



exports.GetID = function (id){
    
    return collection.findOne({"_id" : id});
};



exports.Delete =  function(id){
    return  collection.deleteOne({"_id" : id});
};


exports.Post = function (item){
    
    return collection.insertOne(item);    
};

exports.Put = function (item){
    
 var newValues= {$set: {nombre: item.nombre, forma: item.forma, size: item.size, ingredientes: item.ingredientes, orilla : item.orilla}};
var query = {_id: item.id};
return collection.updateOne(query, newValues);
    
};

 