import React from 'react'
import { connect } from 'react-redux'

import Footer from './Footer'
import Tabs from './Tabs'
import ItemList from './ItemList'
import ItemEdit from './ItemEdit'
import {
  AppModes,
  modeToday,
  createItem,
  editItem
} from '../actions'

const renderToday = (items) => {
  return (
    <div>
      <Tabs />
        <ItemList items={items.filter(item => !item.done)}/>
      <Footer />
    </div>
    );
}

const Main = (props) => {
  const {selected_id, mode, createItem, editItem} = props;
  const items = props.items.list;

  console.log('render main')
  if(mode === AppModes.MODE_EDITING) {
    let item = items.find(item => item.id === selected_id);
    return <ItemEdit 
    item = {{...item}}
    onSave={editItem}/>
  }
  
  if(mode === AppModes.MODE_CREATING)
    return <ItemEdit 
    onSave={createItem}/>
  
  return renderToday(items)
}

const mapStateToProps = state => state;
// {
//     return {
//       mode: state.mode, 
//       selected_id: state.select.id,
//       items: state.items.list
//     }
// };

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