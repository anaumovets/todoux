import React from 'react'
import { connect } from 'react-redux'

import Footer from './Footer'
import Tabs from './Tabs'
import Today from './Today'
import ItemEdit from './ItemEdit'
import {
  AppModes,
  modeToday,
  createItem,
  editItem
} from '../actions'

const Main = ({items, selected_id, mode, createItem, editItem}) => {
  if(mode === AppModes.MODE_EDITING) {
    let item = items.find(item => item.id === selected_id);
    return <ItemEdit 
    item = {{...item}}
    onSave={editItem}/>
  }
  
  if(mode === AppModes.MODE_CREATING)
    return <ItemEdit 
    onSave={createItem}/>
  
  const current = (<Today/>);
     
  return (
  <div>
    <Tabs />
    {current}
    <Footer />
  </div>
  );
}

const mapStateToProps = state => {
    return {
      mode: state.mode, 
      selected_id: state.select.id,
      items: state.items.list
    }
};

const mapDispatchToProps = dispatch => ({
  createItem: item => {
    dispatch(createItem(item));
    dispatch(modeToday());
  },

  editItem: item => {
    dispatch(editItem(item));
    dispatch(modeToday());
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Main)