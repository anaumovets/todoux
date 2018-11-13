import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  AppModes,
  modeToday,
  modeCalendar,
  modeDone,
  changeSelect
} from '../actions'

const Tabs = ({modeToday, modeCalendar, modeDone, mode}) => (
<div style={{width:'100%', display: 'flex', flexDirection: 'row'}}>
  <button 
  disabled={mode === AppModes.MODE_TODAY}
  style={{flex:'1'}}
  onClick={()=>{modeToday();}}>
    Today
  </button>
  <button 
  disabled={mode === AppModes.MODE_CALENDAR}
  style={{flex:'1'}}
  onClick={()=>{modeCalendar();}}>
    Calendar
  </button>
  <button 
  disabled={mode === AppModes.MODE_DONE}
  style={{flex:'1'}}
  onClick={()=>{modeDone();}}>
    Done
  </button>
</div>
)

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  modeToday: () => {
    dispatch(modeToday());
    dispatch(changeSelect());
  },

  modeCalendar: () => {
    dispatch(modeCalendar());
    dispatch(changeSelect());
  },

  modeDone: () => {
    dispatch(modeDone());
    dispatch(changeSelect());
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tabs)