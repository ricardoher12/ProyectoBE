var express = require('express');
var router = express.Router();
//import {Get} from '../modules/functions';
var functions = require('../modules/functions.js');
var GetID = functions.GetID;
var Post = functions.Post;
var Put = functions.Put;
var Delete = functions.Delete;
var Get = functions.Get;
functions.CargarData();


/* GET pizzas listing. */
router.get('/', function(req, res, next) {
  
  res.send(Get());
});

/* GET pizza with an ID listing */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  var pizza = GetID(id);

  if(pizza != false)
  {
    res.send(pizza);
  }else{
    res.status(404).send('{"message":"Object not found"}');
  }
 
});


/*
//POST of a pizza item
app.post('/', function(req, res) {
  var data = req.body.data;
  res.send('Add ' + data);
});

//PUT of a pizza item
app.put('/', function(req, res) {
  var itemId = req.body.id;
  var data = req.body.data;
  res.send('Update ' + itemId + ' with ' + data);
});

//Delete of a pizza item
app.delete('/:id', function(req, res) {
  var itemId = req.params.id;
  res.send('Delete ' + itemId);
});
*/

module.exports = router;
