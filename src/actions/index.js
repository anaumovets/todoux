let nextTodoId = 0

export const createItem = (item) => ({
  type: 'CREATE_ITEM',
  item
});

export const editItem = (item) => ({
  type: 'EDIT_ITEM',
  item
});

export const removeItem = (id) => ({
  type: 'REMOVE_ITEM',
  id
});

export const finishItem = (id) => ({
  type: 'FINISH_ITEM',
  id
});

export const saveItem = (item) => ({
  type: 'SAVE_ITEM',
  item
});

export const toggleSelect = (id) => ({
  type: 'TOGGLE_SELECT',
  id
});

export const AppModes = {
  MODE_EDITING: 'MODE_EDITING',
  MODE_CREATING: 'MODE_CREATING',
  MODE_TODAY: 'MODE_TODAY'
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
