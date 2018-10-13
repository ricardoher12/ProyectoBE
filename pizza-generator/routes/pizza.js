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
    return res.status(200).send(result);
  })
  .catch(function(rejected){
    return res.status(404).send();
  });

 
});


//POST of a pizza item
router.post('/', async function(req, res) {
  var data = req.body;
  if(Object.keys(data).length === 0){
    res.status(400).send("The body cannot be empty");
    return;
  }

  var postItem = Post(data);
  await postItem.then(function(resolve){
    return res.status(201).send();
  })
  .catch(function(reject){
  return res.status(501).send(JSON.stringify(reject));
  });  
});




//PUT of a pizza item
router.put('/', async function(req, res) {
  var data = req.body;
  if(Object.keys(data).length === 0){
    res.status(400).send("The body cannot be empty");
    return;
  }
  
 var getItemID = GetID(data.id);
  await getItemID.then(async function(resolve){
    var updateItem = Put(data);
    await updateItem.then(function(resolve){
      return res.status(204).send();
    })
    .catch(function(reject){
      return res.status(500).send(JSON.stringify(reject));
    });

  })
  .catch(function(reject){
    res.status(404).send();
  });

});

//Delete of a pizza item
router.delete('/:id', async function(req, res) {
  var id = req.params.id;
  var getIDItem = GetID(id);

  await getIDItem.then(async function(result){
    let DeleteItem = Delete(id);
    await DeleteItem.then(function(result){
      res.status(204).send(result);
    })
    .catch(function(rejected){
      res.status(500).send(JSON.stringify(rejected));
    });
  })
  .catch(function(rejected){
    return res.status(404).send();
  });
});

module.exports = router;
