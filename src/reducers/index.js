import {combineReducers} from 'redux';
import {AppModes} from '../actions';

const initial = {
  list: [
  {id:'1', text:'item1 descr', date:Date.now()},
  {id:'2', text:'item2 descr', date:Date.now()}
  ],

  lastid:2,

  nextId: function() {return ++this.lastid}
};

const items = (state = initial, action) => {
  switch (action.type) {
    case 'CREATE_ITEM':
      if(!action.item)
        return state;

      let item = {id: ''+state.nextId(), ...action.item};
      state.list.push(item);
      return {...state};

    case 'EDIT_ITEM':
      if(!action.item)
        return state;

      const ind = state.list.findIndex(x => x.id === action.item.id);
      state.list[ind] = action.item;
      return {...state};

    case 'DELETE_ITEM':
      return state;

      case 'FINISH_ITEM':
      return state;
    
    default:
      return state;
  }
}

const select = (state = {id: null}, action) => {
  switch (action.type) {
    case 'TOGGLE_SELECT':
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
  if(action.mode === state)
    return state;

  if(action.mode !== undefined)
    state = action.mode;
  return state;
}


export default combineReducers({
  items,
  select,
  mode
})