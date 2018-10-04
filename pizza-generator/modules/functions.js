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

//import { isUndefined } from "util";
var pizzas = new Map();
pizzas.set("11", new Pizza('11', 'Mr. Nice', 'Redonda', 'Grande', 'Salsa, queso, tomate, cebolla',  "Si" ));
pizzas.set('12', new Pizza( '12',  'Narco',   'Redonda', 'Grande',  'Salsa, queso, tomate, cebolla', "Si" ))
pizzas.set("13", new Pizza('13',  'Bombasto',   'Redonda', 'Grande',  'Salsa, queso, tomate, cebolla', "Si" ))
pizzas.set("14",new Pizza('14',  'Celeritas',   'Redonda', 'Grande',  'Salsa, queso, tomate, cebolla',  "Si"));
pizzas.set("15", new Pizza('15',  'Magneta',   'Redonda', 'Grande',  'Salsa, queso, tomate, cebolla',  "Si"));
pizzas.set("16",new Pizza('16',  'RubberMan',  'Redonda', 'Grande',  'Salsa, queso, tomate, cebolla',  "Si"));
pizzas.set("17",new Pizza('17',  'Dynama',  'Redonda', 'Grande',  'Salsa, queso, tomate, cebolla',  "Si"));
pizzas.set("18",new Pizza( '18',  'Dr IQ',   'Redonda', 'Grande',  'Salsa, queso, tomate, cebolla',  "Si"));

/*module.exports = {
    Get : function(){
       return this.Get();
    },
    GetId : function(id){
        return this.Get(id);
    },
    Post : function(item){
        return this.Post(item);
    },
    Put :  function(item){
       return this.Put(item);
    },
    Delete: function(id){
        return this.Delete(id);
    }

  };*/

exports.Get = function()
{
    //return JSON.stringify(pizzas);
    return "hola";
}



 exports.GetID = function (id){
    try {
        let pizza = pizzas.get(id);
        if(isUndefined(pizza))
        {
            return false;
        }
        else{
            return JSON.stringify(pizza);
        }
        
    } catch (error) {
        console.log(error);
        return false;
    }
}



exports.Delete = function(id){
    try {
        let pizza = pizzas.get(id);
        if(isUndefined(pizza))
        {
            return false;
        }
        else{
            pizzas.delete(id);
            return true;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.Post = function (item){
try {
    let pizza = JSON.parse(item);
    pizzas.set(pizza.id, pizza);
    return true;
} catch (error) {
    console.log(error);
    return false;
    }
}

exports.Put = function (item){
    try{
        let pizza = JSON.parse(item);
        if(isUndefined(pizzas.get(pizza.id))){
            return false;
        }
        else{
            pizzas.set(pizza.id, pizza);
        }
    }catch (error){
        console.log(error);
        return false;
    }
}

 exports.Delete = function (id){
    try {
        if(isUndefined(pizzas.get(id)))
        {
            return false;
        }else{
            pizzas.delete(id);
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
 }

