var express = require('express');
var config = {database: 'todo'};
var pg = require('pg');

var router = express.Router();
var pool = new pg.Pool(config);

router.post('/',function(req,res){
  console.log('req.body: ',req.body);
  pool.connect(function(err, client,done){
    if(err){
      console.log('error connecting to DB',err);
      res.sendStatus(500);
      done();
    } else {

     client.query(
      'INSERT INTO tasks(task, completed) VALUES($1, $2) returning *;',
      [req.body.taskAddForm, 0],
      function(err,result){
        done();
        if(err){
          console.log('error querying db',err);
          res.sendStatus(500);
        } else {
          console.log('posted info from db',result.rows);
          res.send(result.rows);
        }
      }); // end client.query
    }
  }); // end pool.connect
});//end of post

router.get('/',function(req,res){
  pool.connect(function(err,client,done){
    if(err){
      console.log('error connecting to DB',err);
      res.sendStatus(500);
      done();
    } else {
     client.query(
       'SELECT * FROM tasks',
      function(err,result){
        done();
        if(err){
          console.log('error querying db',err);
          res.sendStatus(500);
        } else {
          console.log('posted info from db',result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});//end of get




module.exports = router;
