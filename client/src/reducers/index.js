import {combineReducers} from 'redux';
import {AppModes} from '../actions';
import * as logic from '../logic/logic.js';

const daylength = 24*3600000;


const initial = {
  // list: [
  // {id:'1', text:'item 1 descr', date: Date.now()},
  // {id:'2', text:'item 2 descr doable', doable: true, date: Date.now()},
  // {id:'3', text:'item 3 descr', date: Date.now()+daylength},
  // {id:'4', text:'item 4 descr doable', doable:true, date: Date.now()+3*daylength},
  // {id:'5', text:'item2 descr doable!', doable: true, date: Date.now()+3*daylength, remindTerm: 5},
  // {id:'6', text:'item2 descr', date: Date.now()+8*daylength},
  // {id:'7', text:(new Array(50)).fill('long').join('\n'), date:Date.now()+5*daylength},
  // {id:'8', text:'item descr doable', doable:true, date: Date.now()-3*daylength},
  // {id:'9', text:'item descr doable', doable:true, date: Date.now()-4*daylength},
  // {id:'10', text:'item descr doable', doable:true, date: Date.now()-5*daylength},
  // ],

  // lastid:7,

  invalid: true,
  isFetching: false
};

const items = (state = initial, action) => {
  switch (action.type) {
    case 'UPDATE_ITEM_CLIENT':
    {
      if(!action.item)
        return state;
      const ind = state.list.findIndex(x => x.id === action.item.id);
      console.log('ind'+ind);
      if(ind === -1) {
        state.list = state.list.concat(logic.getInstances(action.item, Date.now() - 90*daylength, 
        Date.now() + 90*daylength));
        
        //console.log('**'+logic.getInstances(action.item, Date.now() - 90*daylength, 
        //Date.now() + 90*daylength));
      } else {
        state.list[ind] = action.item;
      }
      return {...state};
    }

    case 'REMOVE_ITEM':
    {
      if(!action.id)
        return state;

      const ind = state.list.findIndex(x => x.id === action.id);
      if(ind === -1)
        return state;

      console.log('removing ', ind)
      state.list.splice(ind, 1);
      return {...state};
    }

    // case 'FINISH_ITEM':
    // {
    //   if(!action.id)
    //     return state;

    //   const ind = state.list.findIndex(x => x.id === action.id);
    //   if(ind === -1 || !state.list[ind].doable)
    //     return state;

    //   state.list[ind].done = true;
    //   state.list[ind].donedate = Date.now();
    //   return {...state};
    // }

    case 'UNDO_ITEM':
    {
      if(!action.id)
        return state;

      const ind = state.list.findIndex(x => x.id === action.id);
      if(ind === -1)
        return state;

      delete state.list[ind].done;
      delete state.list[ind].donedate;
      return {...state};
    }

    case 'FETCH_ITEMS':
    {
      if(action.error) {
        return {
          invalid: false,
          isFetching: false,
          error: action.error,
        };
      }

      //receive items
      if(action.data) {
        return {
          list: logic.populate(action.data.items),
          lastid: action.data.lastid || 0,
          isFetching: false, 
          invalid: false
        };
      }

      //initiate fetch
      if(!action.data) {
        return {
          invalid:true, 
          isFetching:true
        };
      }
    }

    case 'POST_ITEMS':
    {
      //let's use fire and forget fetch
      //handle the logic on client as well as on server and
      //only inform the user if something went wrong with the request
      if(action.error) {
        console.error("error while posting items to server: ", action.error);
        return state;
      }

      //post request succesful - do nothing
      if(action.data) {
        return state;
      }

      //initiate fetch
      if(!action.data) {
        return {
          invalid:true, 
          isFetching:true
        };
      }
    }

    default:
      return state;
  }
}

const select = (state = {id: null}, action) => {
  switch (action.type) {
    case 'CHANGE_SELECT':
      if(state.id === action.id)
        state.id = undefined;
      else
        state.id = action.id;
      return {...state}
    default:
      return state
  }
}

const mode = (state = AppModes.MODE_TODAY, action) => {
  switch (action.type) {
    case 'CHANGE_MODE': {
      if(action.mode === state)
        return state;
  
      if(action.mode !== undefined)
        state = action.mode;

      return state;
    }
    default:
      return state;
  }
}


export default combineReducers({
  items,
  select,
  mode
})