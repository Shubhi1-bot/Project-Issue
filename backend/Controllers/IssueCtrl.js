var dateFormat = require('dateformat');
var crudModel = require('../config/models/crud');
var ObjectId = require('mongodb').ObjectID;

exports.createRecord = function(req, res, next) {
    req.body.created_Date = dateFormat(new Date(), "isoDateTime");
    req.body.updated_Date = dateFormat(new Date(), "isoDateTime");
crudModel.insertFunction(req.body, function(err,result){
    if(err){
        res.send(err);

    }
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send({ "success":true, data: 'Issue successfully created' });
    res.end();
    return;

   

})
   
}

exports.getRecord = function(req, res, next) {
  
crudModel.getAllRecords( function(err,result){
    if(err){
        res.send(err);

    }
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send({  data: result });
    res.end();
    return;


})
   
}

exports.getRecordById = function(req, res, next) {
    var id = req.params.id;
    if (id != 'undefined') {
        var whereQuery = { "_id": ObjectId(id) }; 

        crudModel.getAllRecordWhere( whereQuery, function(err,result){
            if(err){
                res.send(err);
        
            }
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).send({  data: result });
            res.end();
            return;
        
        
        })
    }
   
       
    }

exports.putRecord = function(req, res, next) {
    var id = req.params.id;
    if(id != 'undefined') {
        var whereQuery = { "_id": ObjectId(id) };
    
   
    req.body.updated_Date = dateFormat(new Date(), "isoDateTime");
    
crudModel.upsertRecord(whereQuery,req.body, function(err,result){
    if(err){
        res.send(err);

    }
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send({ "success":true, data: 'Issue successfully updated' });
    res.end();
    return;



})
    }
   
}

exports.deleteRecord = function(req, res, next) {
    var id = req.params.id;
    if(id != 'undefined') {
        var whereQuery = { "_id": ObjectId(id) };

        crudModel.deleteRecord(whereQuery, function(err,result){
            if(err){
                res.send(err);
            }
            
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).send({ "success":true, data: 'Issue successfully deleted' });
            res.end();
            return;
           
        
        })
           
    }

   

}