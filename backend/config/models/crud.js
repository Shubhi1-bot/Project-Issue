var db = require('../database');
var assert = require('assert');


exports.insertFunction = function(request,callback) {
    var connection = db.getconnection();
   
    const collection = connection.collection("Issues");
    console.log(collection);
    
   
    collection.insertOne(request,function(err, result) {
      assert.equal(err, null);
   
      var returnData = result.ops[0];
      callback(null,returnData);
    });
  }
  exports.upsertRecord = function(whereQuery,request,callback) {
    var connection = db.getconnection();
    const collection = connection.collection("Issues");
    var requestData = {$set:request};
    const options = { upsert: true };
    collection.updateOne(whereQuery,requestData,options, function(err, result) {
      assert.equal(err, null);
      
      callback(null,result);
    });
  
  }
  exports.getAllRecords = function(callback) {
    var connection = db.getconnection();
  
    const collection = connection.collection("Issues");
  
    collection.find({}).sort({created_date :-1}).toArray(function(err, docs) {
      assert.equal(err, null);
     
      callback(null,docs);
    })
    
  }
  exports.getAllRecordWhere = function(where,callback) {
    var connection = db.getconnection();
    
    const collection = connection.collection("Issues");
   
    collection.find(where).sort({created_date :-1}).toArray(function(err, docs) {
      assert.equal(err, null);
     
      callback(null,docs);
    });
 
    
  }

  exports.deleteRecord = function(where,callback) {
    var connection = db.getconnection();
    
    const collection = connection.collection("Issues");
   
    collection.deleteMany(where);
    callback(null,'deleted');

  }


