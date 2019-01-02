// @flow

import {combineReducers} from 'redux';
import {AppModes} from '../actions';
import * as logic from '../logic/logic.js';

const daylength = 24*3600000;

const isChild = (item, sourceid) => {
  const dotind = (''+item.id).indexOf('.');
  if(dotind === -1)
    return item.id === sourceid;
  return ((''+item.id).substring(0, dotind) == '' + sourceid);
};

const initial = {
  invalid: true,
  isFetching: false,
  list: []
};

const items = (state = initial, action: Object) => {
  switch (action.type) {
    case 'UPDATE_ITEM_CLIENT':
    {
      if(!action.item)
        return state;

      const sourceid = logic.getSourceId(action.item.id);
      let item = action.item;

      state.list = state.list.filter(x => !isChild(x, sourceid));
      state.list = state.list.concat(logic.getInstances(item, Date.now() - 90*daylength, 
                        Date.now() + 90*daylength));

      return {...state};
    }

    case 'REMOVE_ITEM':
    {
      if(!action.id)
        return state;

      const sourceid = logic.getSourceId(action.id);

      state.list = state.list.filter(x => !isChild(x, sourceid));
      return {...state};
    }

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
          list: logic.populate(action.data.items, Date.now() - 90*daylength, 
          Date.now() + 90*daylength),
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