import {combineReducers} from 'redux';
import {AppModes} from '../actions';

const initial = {
  list: [
  {id:'1', text:'item1 descr', date: new Date()},
  {id:'2', text:'item2 descr', date: new Date()}
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
    {
      if(!action.item)
        return state;
      const ind = state.list.findIndex(x => x.id === action.item.id);
      state.list[ind] = action.item;
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

    case 'FINISH_ITEM':
    {
      if(!action.id)
        return state;

      const ind = state.list.findIndex(x => x.id === action.id);
      if(ind === -1 || !state.list[ind].doable)
        return state;

      state.list[ind].done = true;
      return {...state};
    }

    
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