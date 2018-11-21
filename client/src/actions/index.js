const nextId = (state) => ++state.items.lastid;

export const updateItemClient = (item) => ({
  type: 'UPDATE_ITEM_CLIENT',
  item
});

export const createItem = (item) => (dispatch, getState) => {
  const newitem = {id:nextId(getState()), ...item};
  dispatch(updateItemClient(newitem));
  dispatch(postItems([newitem]));
};

export const editItem = (item) => (dispatch) => {
  dispatch(updateItemClient(item));
};

export const removeItem = (id) => ({
  type: 'REMOVE_ITEM',
  id
});

export const finishItem = (id) => ({
  type: 'FINISH_ITEM',
  id
});

export const undoItem = (id) => ({
  type: 'UNDO_ITEM',
  id
});

// export const saveItem = (item) => ({
//   type: 'SAVE_ITEM',
//   item
// });

export const fetchItemsImpl = (error, data) => ({
  type: 'FETCH_ITEMS',
  error,
  data
});

export const fetchItems = () => (dispatch) => {
  dispatch(fetchItemsImpl());
  return fetch(`http://0.0.0.0:4017/items`)
    .then(
      response => {
        //console.log('response', response, 'json', response.json());
        return response.json();
      })
    .then(json => {
      console.log('json ', json)
      return dispatch(fetchItemsImpl(null, json))
    })
    .catch(error => dispatch(fetchItemsImpl(error)));
}


export const postItems = (items) => (dispatch) => {
    return fetch(`http://0.0.0.0:4017/items`,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({"items": items})
    })
    .then(
      response => {
        console.log('response', response, 'json', response.json());
      },
      error => dispatch(fetchItemsImpl(error))
    );
}

export const changeSelect = (id) => ({
  type: 'CHANGE_SELECT',
  id
});

export const AppModes = {
  MODE_EDITING: 'MODE_EDITING',
  MODE_CREATING: 'MODE_CREATING',
  MODE_TODAY: 'MODE_TODAY',
  MODE_CALENDAR: 'MODE_CALENDAR',
  MODE_DONE: 'MODE_DONE'
}

export const modeEdit = () => ({
  type: 'CHANGE_MODE',
  mode: AppModes.MODE_EDITING,
});

export const modeCreate = () => ({
  type: 'CHANGE_MODE',
  mode: AppModes.MODE_CREATING
});

export const modeToday = () => ({
  type: 'CHANGE_MODE',
  mode: AppModes.MODE_TODAY
});

export const modeCalendar = () => ({
  type: 'CHANGE_MODE',
  mode: AppModes.MODE_CALENDAR
});

export const modeDone = () => ({
  type: 'CHANGE_MODE',
  mode: AppModes.MODE_DONE
});