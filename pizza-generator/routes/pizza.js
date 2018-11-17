const express = require('express');
const router = express.Router();
const functions = require('../modules/functions.js');
const GetID = functions.GetID;
const Post = functions.Post;
const Put = functions.Put;
const Delete = functions.Delete;
const Get = functions.Get;
const redis = require('redis');
const config = require('config');
const redisHost = config.get('Redis.redisConfig.host');
const redisPort = config.get('Redis.redisConfig.port');
const clientRedis = redis.createClient(redisPort, redisHost, {enable_offline_queue: true,  
  retry_strategy: (options) => {
    if (options.times_connected >= 2) {
        // End reconnecting after a specific number of tries and flush all commands with a individual error
        return new Error('Retry attempts exhausted');
    }
    // reconnect after
    return 1000;
}
} );
clientRedis.retry_delay = 0;

clientRedis.on('connect', function() {
  console.log('Redis client connected');
});

clientRedis.on('error', function (err) {
  console.log('Something went wrong ' + err);
  
  
  
});


  setInterval(function(){
    //console.log("Entered to ping");
    clientRedis.ping(function (err, result){
      if(result){
        console.log("Redis pinged");
      }

      if(err){
        console.log("There was an error " + err);
      }
    })

  }, 60000)


/* GET pizzas listing. */
router.get('/', function(req, res, next) {
  try{
    console.log( "Get recivied from " + req.hostname);
    res.setHeader("Content-Type", "application/json");
    
    clientRedis.get('pizzas', (err, result) => {
      if(result){
        return res.status(200).send(result);
      }
      else{
        Get().then(function(result){
          if(result.length > 0){
            clientRedis.flushall();
            clientRedis.setex("pizzas", 5 ,JSON.stringify(result))
            var responseGet = JSON.stringify(result);
            result.forEach(element => {
              clientRedis.setex(element._id.toString(), 30, JSON.stringify(element));
            });
           return res.status(200).send(responseGet);
          }else{
            res.status(404).send();
          } 
         }).catch(error => {
           var message = error.message;
           res.status(500).send(JSON.stringify({ errorMessage: message }))});
        
      }
    });
  }
  catch(error){
    console.log(error);
    return res.status(500).send(JSON.stringify({errorMessage: error}));

  }
 

 
    
});

/* GET pizza with an ID listing */
router.get('/:id',  function(req, res, next) {
  
  try{
    res.setHeader("Content-Type", "application/json");
    var id = req.params.id;
    clientRedis.get(id, (error, result) =>{
      if(result){
          return res.status(200).send(result);
      }
      else{
        GetID(id).then(result => {
          if(result)
          {
            clientRedis.setex(result._id, 5, JSON.stringify(result));
            return res.status(200).send(JSON.stringify(result));
          }
          else{
            return res.status(404).send();
          }
        }).catch(error => {
          var message = error.message;
          res.status(500).send(JSON.stringify({ errorMessage: message }))});
  
      }
    });

  }
  catch(error)
  {
    console.log(error);
    return res.status(500).send(JSON.stringify({errorMessage: error}));
  }
  
});


//POST of a pizza item
router.post('/', function(req, res) {
  res.setHeader("Content-Type", "application/json");
  var data = req.body;
  if(Object.keys(data).length === 0){
    res.status(400).send({errorMessage: "El cuerpo no puede estar vacio"});
    return;
  }

   Post(data).then(result => {
    return res.status(201).send();
  }) .catch(error => {
    if(error === 404){
      return res.status(400).send(JSON.stringify({errorMessage: "La pizza no se pudo insertar"}));
    }
    var message = error.message;
    res.status(500).send(JSON.stringify({ errorMessage: message }))});
});




//PUT of a pizza item
router.put('/:id', function(req, res) {
  res.setHeader("Content-Type", "application/json");
  var data = req.body;
  var id = req.params.id;
  if(Object.keys(data).length === 0){
    res.status(400).send(JSON.stringify({errorMessage: "El cuerpo no puede estar vacio"}));
    return;
  }
  
  GetID(id).then(result => {
    if(result){
      Put(id, data).then(response =>{
        res.status(204).send();
      }).catch(error =>{
        var message = error.message;
        res.status(500).send(JSON.stringify({ errorMessage: message }))});
    }
    else{
      return res.status(404).send(JSON.stringify({errorMessage: "La pizza no se pudo modificar"}));
    }
  }).catch(error =>{
    var message = error.message;
    res.status(500).send(JSON.stringify({ errorMessage: message }))});
 });

//Delete of a pizza item
router.delete('/:id',  function(req, res) {
  var id = req.params.id;
  res.setHeader("Content-Type", "application/json");
  GetID(id).then(result => {
    if(result){
      Delete(id).then(response =>{
        res.status(204).send();
      }).catch(error =>{
        var message = error.message;
        res.status(500).send(JSON.stringify({ errorMessage: message }))});
    }
    else{
      return res.status(404).send();
    }
  }).catch(error =>{
    if(error === 404){
      return res.status(400).send();
    }
    var message = error.message;
   res.status(500).send(JSON.stringify({ errorMessage: message }))});
   
});

module.exports = router;
