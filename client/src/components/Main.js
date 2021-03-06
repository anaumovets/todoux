// @flow
import React from 'react';
import { connect } from 'react-redux';

import Footer from './Footer';
import Tabs from './Tabs';
import ItemList from './ItemList';
import ItemEdit from './ItemEdit';
import {
  AppModes,
  modeToday,
  createItem,
  editItem
} from '../actions';
import * as logic from '../logic/logic.js';

const daylength = 24*3600000;

const renderError = (error) => {
  return <div>{'ERROR LOADING ITEMS:' + JSON.stringify(error)}</div>
}

const renderLoading = () => {
  return <div>Loading...</div>
}


const renderToday = (date: number, items: Array<Object>) => {
  const date2day = date => Math.floor(date/daylength);
  const relevant = item => {
    if(!logic.isVisible(item))
      return false;

    if(!item.doable)
      return date2day(date) === date2day(item.date);

    return !item.done && 
          (date2day(date) >= date2day(item.date) - (item.remindTerm || 0));
  };

  return (
    <div>
      <div style={{textAlign:"center"}}>
        <b>{(new Date(date)).toDateString()}</b>
      </div>
      <ItemList items={items.filter(relevant)}/>
    </div>
  );
}

const renderDay = (date: number, items: Array<Object>, isToday: boolean) => {
  items = items || [];
  if(!isToday && !items.length)
    return null;

  const headerStyle = {
    textAlign:"center",
    backgroundColor: isToday ? '#ffffaa' : '#ffffff'
  };

  const empty = <center><br/>No items for today!<br/></center>;

  return <div
    key={'day'+Math.floor(date/daylength)}
    style={{
        float:"center"
    }}>
        <div style={headerStyle} id={isToday ? 'id_today' : null}>
          <b>{(new Date(date)).toDateString()}</b>
        </div>
        {items.length ? <ItemList items={items}/> : empty}
        <br/><br/><br/>
  </div>
}

const renderCalendar = (mindate: number, maxdate: number, today: number, 
  items: {list: Array<Object>}) => {
  const date2day = date => Math.floor(date/daylength);
  const date2idx = date => date2day(date) - date2day(mindate);
  const idx2date = idx => mindate + idx*daylength;

  const calendar = (new Array(date2idx(maxdate)+1)).fill().map(x=>({items:[]}));

  items.list.filter(item => !item.done && logic.isVisible(item)).forEach(item => {
    const i = date2idx(item.date);
    if(i < 0 || i >= calendar.length) return;
    calendar[i].items.push(item);
  });

  return calendar.map((day, i) => renderDay(idx2date(i), day.items, i === date2idx(today)));
}

type MainImplProps = {
  items: {
    error? : string,
    isFetching: boolean,
    list: Array<Object>,
  },

  mode: string,
  createItem: ()=>void,
  editItem: ()=>void,
  select: ()=>void,

};

const MainImpl = (props: MainImplProps)=> {
  if(!props.items || props.items.isFetching)
    return renderLoading();
  if(props.items.error)
    return renderError(props.items.error);
  const {select, mode, createItem, editItem, items} = props;
  //const items = props.items.list;

  if(mode === AppModes.MODE_EDITING) {
    let item = items.list.find(item => item.id === logic.getSourceId(select.id));
    return <ItemEdit item = {{...item}} onSave={editItem}/>
  }
  
  if(mode === AppModes.MODE_CREATING)
    return <ItemEdit onSave={createItem}/>

  if(mode === AppModes.MODE_CALENDAR) {
    return wrap(
      renderCalendar(Date.now() - 90*daylength, 
                     Date.now() + 90*daylength,
                     Date.now(), items),
      mode
    );
  }

  if(mode === AppModes.MODE_DONE) {
    return wrap(<ItemList items={items.list.filter(item => item.done)}/>, mode);
  }

  return wrap(renderToday(Date.now(), items.list), mode);
}

const wrap = (element, mode) => {
  const scrollView = <div style={{height:"85vh", overflowY:"scroll"}}>{element}</div>;

  return <div>
    <Tabs mode={mode}/>
      {scrollView}
    <Footer isDoneMode={mode===AppModes.MODE_DONE}/>
  </div>
}



type MainState = {
  scrolled: boolean
}

class Main extends React.Component<MainImplProps, MainState> {
  state = {
    scrolled: false
  };

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if(this.state.scrolled)
      return;

    const element = document.getElementById("id_today");
    if(element) {
      element.scrollIntoView({behavior: 'smooth'});
      this.state.scrolled = true;
    }
  }

  render() {
    return (
    <div style={{
      marginLeft:"auto",
      marginRight:"auto",
      width:"30em",
      fontFamily:"sans serif"
    }}>
      <MainImpl {...this.props}/>
    </div>
    );
  }
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