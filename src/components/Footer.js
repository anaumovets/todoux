import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../actions'

const Footer = ({
  selected_id,
  items,
  modeCreate,
  modeEdit,
  removeItem,
  finishItem
  }) => {
    const selected_item = items.find(i=>i.id === selected_id);

    return (
    <div style={{width:'100%', display: 'flex', flexDirection: 'row'}}>
      <button style={{flex:'1'}}
      onClick={()=>{modeCreate()}}>New</button>
      <button style={{flex:'1'}}
      disabled={!selected_id}
      onClick={()=>{modeEdit(selected_id)}}>Edit</button>
      <button style={{flex:'1'}}
      disabled={!selected_id}
      onClick={()=>{removeItem(selected_id)}}>Remove</button>
      <button style={{flex:'1'}}
      disabled={!selected_id || !selected_item || !selected_item.doable}
      onClick={()=>{finishItem(selected_id)}}>Finish</button>
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
  modeCreate: () => dispatch(actions.modeCreate()),
  modeEdit: (id) => dispatch(actions.modeEdit(id)),
  removeItem: (id) => dispatch(actions.removeItem(id)),
  finishItem: (id) => dispatch(actions.finishItem(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)
