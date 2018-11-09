import {combineReducers} from 'redux';
import {AppModes} from '../actions';

const daylength = 24*3600000;

const initial = {
  list: [
  {id:'1', text:'item 1 descr', date: Date.now()},
  {id:'2', text:'item 2 descr doable', doable: true, date: Date.now()},
  {id:'3', text:'item 3 descr', date: Date.now()+daylength},
  {id:'4', text:'item 4 descr doable', doable:true, date: Date.now()+3*daylength},
  {id:'5', text:'item2 descr doable!', doable: true, date: Date.now()+3*daylength, remindTerm: 5},
  {id:'6', text:'item2 descr', date: Date.now()+8*daylength},
  {id:'7', text:(new Array(50)).fill('long').join('\n'), date:Date.now()}
  ],

  lastid:7,

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
      state.list[ind].donedate = Date.now();
      return {...state};
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