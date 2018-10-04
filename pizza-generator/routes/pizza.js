var express = require('express');
var router = express.Router();
//import {Get} from '../modules/functions';
var functions = require('../modules/functions.js');
var GetID = functions.GetID;

/* GET pizzas listing. */
router.get('/', function(req, res, next) {
  //res.send(functions.Get());
});

/* GET pizza with an ID listing */
/*router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  //res.send(functions.Get(id));
});

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
