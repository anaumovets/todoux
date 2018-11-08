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

const daylength = 24*3600000;

const renderToday = (date, items) => {
  const date2day = date => Math.floor(date/daylength);
  const relevant = item => {
    if(!item.doable)
      return date2day(date) === date2day(item.date);

    return !item.done && 
          (date2day(date) >= date2day(item.date) - (item.remindTerm || 0));
  };

  return (
    <div>
      <Tabs mode={AppModes.MODE_TODAY}/>
      <b>{(new Date(date)).toDateString()}</b>
        <ItemList items={items.filter(relevant)}/>
      <Footer />
    </div>
  );
}

const renderDay = (date, items) => {
  if(!items || !items.length)
    return null;

  return <div
    key={'day'+Math.floor(date/daylength)}
    style={{
        float:"center"
    }}>
        <b>{(new Date(date)).toDateString()}</b>
        <ItemList items={items}/>
  </div>
}

const renderCalendar = (mindate, maxdate, today, items) => {
  const date2idx = day => Math.floor((day - mindate)/daylength);
  const calendar = (new Array(date2idx(maxdate)+1)).fill().map(x=>({items:[]}));
  const idx2date = idx => mindate + idx*daylength;

  items.filter(item => !item.done).forEach(item => {
    calendar[date2idx(item.date)].items.push(item);
  });

  return calendar.map((day, i) => renderDay(idx2date(i), day.items));
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
    return (
      <div>
        <Tabs mode={mode}/>
        {renderCalendar(Date.now() - 30*daylength, 
                        Date.now() + 30*daylength,
                        Date.now(), items) }
      </div>
    );
  }

  if(mode === AppModes.MODE_DONE) {
    return (
      <div>
        <Tabs mode={mode}/>
        <ItemList items={items.filter(item => item.done)}/>
      </div>
    );
  }
  
  return renderToday(Date.now(), items);
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