'use strict';
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;

const daylength = 24*3600000;
const initial = {
  list: [
  {id:'1', text:'item 1 descr', date: Date.now()},
  {id:'2', text:'item 2 descr doable', doable: true, date: Date.now()},
  {id:'3', text:'item 3 descr', date: Date.now()+daylength},
  {id:'4', text:'item 4 descr doable', doable:true, date: Date.now()+3*daylength},
  {id:'5', text:'item2 descr doable!', doable: true, date: Date.now()+3*daylength, remindTerm: 5},
  {id:'6', text:'item2 descr', date: Date.now()+8*daylength},
  {id:'7', text:(new Array(50)).fill('long').join('\n'), date:Date.now()+5*daylength},
  {id:'8', text:'item descr doable', doable:true, date: Date.now()-3*daylength},
  {id:'9', text:'item descr doable', doable:true, date: Date.now()-4*daylength},
  {id:'10', text:'item descr doable', doable:true, date: Date.now()-5*daylength},
  ],

  lastid:7
};

const Controller = function(dburl) {
    MongoClient.connect(dburl, (err, client) => {
        if(err) {
            return;
        }
        this.db = client.db('items');
    });

    return this;
}

Controller.prototype.getItems = function(req, res) {
    const convert = item => {delete item._id; return item;};

    this.db.collection('items').find().toArray( 
        function(err, r) {
            assert.equal(err, null);
            res.json(r.map(convert));
        }
    );
}

Controller.prototype.postItems = function(req, res) {
    const convert = item => {item._id = item.id; return item;};
    console.log(req);
    const items = req.body.items.map(convert);

    this.db.collection('items').insert(items, 
        function(err, r) {
            if(err)
            {
                res.status(200).json({'error': err});
                res.end();
                return;
            }
            assert.equal(err, null);
            res.json(r);
    });
}

module.exports = function (dburl) {
    return new Controller(dburl);
}

