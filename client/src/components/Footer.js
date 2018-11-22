import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../actions'

const Footer = ({
  isDoneMode,
  selected_id,
  items,
  modeCreate,
  modeEdit,
  removeItem,
  finishItem,
  undoItem
  }) => {
    const selected_item = items.find(i=>i.id === selected_id);

    const buttonHelper = (fn, text, disabled) => (
      <button style={{flex:'1'}} disabled={disabled} onClick={fn}>{text}</button>
    );

    return (
    <div style={{width:'30em', display: 'flex', flexDirection: 'row'}}>
      {buttonHelper(modeCreate, 'New', false)}
      {buttonHelper(()=>modeEdit(selected_id), 'Edit', !selected_id)}
      {buttonHelper(()=>removeItem(selected_id), 'Remove', !selected_id)}
      {!isDoneMode && buttonHelper(()=>finishItem(selected_item), 'Finish', 
        !selected_id || !selected_item || !selected_item.doable)}
      {isDoneMode && buttonHelper(()=>undoItem(selected_id), 'Undo', !selected_id)}
    </div>
    );
  }

const mapStateToProps = state => {
  return {
    selected_id: state.select.id,
    items: state.items.list
  }
};

const mapDispatchToProps = dispatch => ({
  modeCreate: () => {
    dispatch(actions.modeCreate());
    dispatch(actions.changeSelect());
  },
  modeEdit: (id) => {
    dispatch(actions.modeEdit(id));
  },
  removeItem: (id) => {
    dispatch(actions.removeItem(id));
    dispatch(actions.changeSelect());
  },
  finishItem: (item) => {
    dispatch(actions.finishItem(item));
    dispatch(actions.changeSelect());
  },
  undoItem: (id) => {
    dispatch(actions.undoItem(id));
    dispatch(actions.changeSelect());
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)