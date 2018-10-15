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
router.get('/', function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  Get().then(function(result){
  if(result.length > 0){
    var responseGet = JSON.stringify(result);
   res.status(200).send(responseGet);
  }else{
    res.status(404).send();
  } 
 }).catch(error => {
   var message = error.message;
   res.status(500).send(JSON.stringify({ errorMessage: message }))});
  
});

/* GET pizza with an ID listing */
router.get('/:id',  function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var id = req.params.id;
  GetID(id).then(result => {
    if(result != null)
    {
      return res.status(200).send(JSON.stringify(result));
    }
    else{
      return res.status(404).send();
    }
  }).catch(error => {
    var message = error.message;
    res.status(500).send(JSON.stringify({ errorMessage: message }))});
});


//POST of a pizza item
router.post('/', function(req, res) {
  res.setHeader("Content-Type", "application/json");
  var data = req.body;
  if(Object.keys(data).length === 0){
    res.status(400).send("The body cannot be empty");
    return;
  }

   Post(data).then(result => {
    return res.status(201).send();
  }) .catch(error => {
    var message = error.message;
    res.status(500).send(JSON.stringify({ errorMessage: message }))});
});




//PUT of a pizza item
router.put('/', function(req, res) {
  res.setHeader("Content-Type", "application/json");
  var data = req.body;
  if(Object.keys(data).length === 0){
    res.status(400).send("The body cannot be empty");
    return;
  }
  
  GetID(data.id).then(result => {
    if(result != null){
      Put(data).then(response =>{
        res.status(204).send();
      }).catch(error =>{
        var message = error.message;
        res.status(500).send(JSON.stringify({ errorMessage: message }))});
    }
    else{
      return res.status(404).send();
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
    if(result != null){
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
    var message = error.message;
   res.status(500).send(JSON.stringify({ errorMessage: message }))});
   
});

module.exports = router;
