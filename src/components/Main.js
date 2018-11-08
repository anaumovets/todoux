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

const renderDay = (date, items) => {

  if(!items || !items.length)
    return null;

  return <div
    key={'day'+Math.floor(date/24*3600000)}
    style={{
        float:"center"
    }}>
        <b>{(new Date(date)).toDateString()}</b>
        <ItemList items={items}/>
  </div>
}

const renderCalendar = (mindate, maxdate, today, items) => {
  const daylength = 24*3600000;
  const date2idx = day => Math.floor((day - mindate)/daylength);
  const calendar = (new Array(date2idx(maxdate)+1)).fill().map(x=>({items:[]}));
  const idx2date = idx => mindate + idx*daylength;

  items.forEach(item => {
    calendar[date2idx(item.date)].items.push(item);
  });

  return calendar.map((day, i) => renderDay(idx2date(i), day.items))
}

const MainImpl = (props) => {
  const {selected_id, mode, createItem, editItem} = props;
  const items = props.items.list;

  if(mode === AppModes.MODE_EDITING) {
    let item = items.find(item => item.id === selected_id);
    return <ItemEdit item = {{...item}} onSave={editItem}/>
  }
  
  if(mode === AppModes.MODE_CREATING)
    return <ItemEdit onSave={createItem}/>

  if(mode === AppModes.MODE_CALENDAR) {
    const daylength = 24*3600000;

    return (
      <div>
        {renderCalendar(Date.now() - 30*daylength, 
                        Date.now() + 30*daylength,
                        Date.now(), items) }
      </div>
    );
  }

  if(mode === AppModes.MODE_DONE) {
    return <ItemList items={items.filter(item => item.done)}/>
  }
  
  return renderToday(items)
}

const Main = (props) => {
  return (
  <div style={{
    width:"50em",
    fontFamily:"sans serif"}}>
    <MainImpl {...props}/>
  </div>
  );
}

const mapStateToProps = state => state;

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