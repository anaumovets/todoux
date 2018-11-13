'use strict';

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

exports.getItems = function(req, res) {
    res.json(initial);
}