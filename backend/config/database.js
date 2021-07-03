


var MongoClient = require('mongodb').MongoClient;

var  url = 'mongodb+srv://shubhi_1:Mongo@1@cluster0.tik7g.mongodb.net/test';

var assert = require('assert');
var connection=[]
var dbName = 'Issues';
// Create the database connection
establishConnection = function(callback){
                MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {
                    assert.equal(null, err);

                    const db = client.db(dbName);
                        connection = db;
                        if(typeof callback === 'function' && callback())
                            callback(connection);
                    }

                )
}
function getconnection(){
    return connection
}

module.exports = {

    establishConnection:establishConnection,
    getconnection:getconnection
}