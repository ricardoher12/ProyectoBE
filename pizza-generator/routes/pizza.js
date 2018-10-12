var express = require('express');
var router = express.Router();
var functions = require('../modules/functions.js');
var GetID = functions.GetID;
var Post = functions.Post;
var Put = functions.Put;
var Delete = functions.Delete;
var Get = functions.Get;
functions.CargarData();


/* GET pizzas listing. */
router.get('/', async function(req, res, next) {
 var getitems = Get();
 await getitems.then(function(result){
   var responseGet = JSON.stringify(result);
   res.status(200).send(responseGet);
 });
  
});

/* GET pizza with an ID listing */
router.get('/:id', async function(req, res, next) {
  var id = req.params.id;
  var getIDItem = GetID(id);
  await getIDItem.then(function(result){
    res.status(200).send(result);
  })
  .catch(function(rejected){
    res.status(401).send();
  });

 
});


//POST of a pizza item
router.post('/', function(req, res) {
  var data = req.body;
  if(Object.keys(data).length === 0){
    res.status(400).send("The body cannot be empty");
    return;
  }
  if(Post(data)){
    res.status(201).send("Transaction Processed");
  } else{
    res.status(500).send("The item cannot be inserted");
  } 

});


//PUT of a pizza item
router.put('/', function(req, res) {
  var data = req.body;
  if(Object.keys(data).length === 0){
    res.status(400).send("The body cannot be empty");
    return;
  }
  var response = Put(data);
  if( response== true){
    res.status(204).send("Transaction Processed");
  }else{
    if(response == 1){
      res.status(500).send("Invalid item");
    }else{
      if(response == false){
        res.status(404).send("Object not found");
      }
    }

  }
});

//Delete of a pizza item
router.delete('/:id', function(req, res) {
  var itemId = req.params.id;
  
  if(Delete(itemId)){
    res.status(204).send("Transaction Processed");
  }else{
    res.status(404).send("Object not found");
  }
  res.send('Delete ' + itemId);
});

module.exports = router;
