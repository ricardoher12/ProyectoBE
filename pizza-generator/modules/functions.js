//import { isUndefined } from "util";
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/Comida_Rapida';
const dbName = "Comida_Rapida";
const collectionName = "Pizza";
const _id = "_id";


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





/*exports.Get = function(){
    
    return JSON.stringify(Array.from(pizzas));
    //return "hola";
};*/


exports.Get =  function(){
   
    return new Promise(function (resolve, reject){
        try {
            MongoClient.connect(url, function(err, db){
                if(err){
                    console.log(err);
                    return reject(err);
                }
                var dbo = db.db(dbName);
                dbo.collection(collectionName).find({}).toArray(function(err, res) {
                    if(err){
                        console.log(err);
                        return reject(err);
                    }
                    console.log("Consulta Exitosa");
                    db.close();
                    resolve(JSON.stringify(res));
                });
        
            });
            
        } catch (error) {
            reject(false);
        }
        
    });
};


 /*exports.GetID = function (id){
    try {
        
        MongoClient.connect(url, function(err, db){
            assert.equal(null, err);
            console.log("Connected to server");
            var comidaRapida = db.db("Comida_Rapida");
            var pizza = comidaRapida.collection("pizza");
        });
    } catch (error) {
        console.log(error);
        return false;
    }
};*/


exports.GetID = function (id){
    return new Promise(function(resolve, reject){
        try {
            MongoClient.connect(url, async function(err, db){
                if(err){
                    console.log(err);
                    return reject(err);
                }
                var dbo = db.db(dbName);
                dbo.collection(collectionName).findOne({_id : id}, function(err, item){
                    if(err){
                        //throw err;
                        console.log(err);
                        return reject(err);
                    }

                    if(item == null){
                       return reject(new Error("item not found"));
                    }
                    console.log("Consulta Exitosa");
                    db.close();
                    return resolve(JSON.stringify(item));
                });
            });
            
            
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
    
    
};




exports.Delete = function(id){
    try {
        MongoClient.connect(url, async function(err, db){
            if(err){
                throw err;
            }
            var dbo = db.db(dbName);
            var db
        });

    } catch (error) {
        console.log(error);
        return false;
    }
};
/*
exports.Post = function (item){
try {
    //var example = JSON.stringify(new Pizza("1", "Napolitana", "Redonda", "Grande", "todos", "si"));
    if(item.id == null || item.nombre == null || item.forma == null || item.ingredientes == null || item.size ==null || item.orilla == null){
        return false;
    }

    let pizza = new Pizza(item.id, item.nombre, item.forma, item.size, item.ingredientes, item.orilla);
    let aux = pizzas.get(pizza.id);
    if(aux != null){
        return false;
    }
    pizzas.set(pizza.id, pizza);
    return true;
} catch (error) {
    console.log(error);
    return false;
    }
};
*/

exports.Post = function (item){
    try {
        //var example = JSON.stringify(new Pizza("1", "Napolitana", "Redonda", "Grande", "todos", "si"));
        MongoClient.connect(url, function(err, db){
            assert.equal(null, err);
            var dbo = db.db(dbName);
            dbo.collection(collectionName).insertOne(item, function(err, res){
                if(err){
                    throw err;
                }
                console.log("1 document inserted");
                db.close();
            });

        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
        }
    };

exports.Put = function (item){
    try{
        if(item.id == null || item.nombre == null || item.forma == null || item.ingredientes == null || item.size ==null || item.orilla == null){
            return 1;
        }
       let pizza = new Pizza(item.id, item.nombre, item.forma, item.size, item.ingredientes, item.orilla);

        if(pizzas.get(pizza.id) == null){
            return false;
        }
        else{
            pizzas.set(pizza.id, pizza);
            return true;
        }
    }catch (error){
        console.log(error);
        return false;
    }
};

 