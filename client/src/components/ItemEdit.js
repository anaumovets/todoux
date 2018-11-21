import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {toggleSelect} from '../actions'
import DatePicker from 'react-date-picker'

const ItemEdit = ({item, onSave}) => {
    item = item || {};
    item.date = item.date || Date.now();

    let textinput, dateinput;
    let yearlyEl, monthlyEl, weeklyEl, daysOfWeekEl,
    isDoableEl, daysPeriodEl, remindTermEl, isRegularEl, regularBlockEl;
    let weekdayEls = new Array(7);

    const updatePeriod = (el) => {
        item.yearly = (el === yearlyEl) ? yearlyEl.checked : false;
        item.monthly = (el === monthlyEl) ? monthlyEl.checked : false;
        item.weekly = (el === weeklyEl) ? weeklyEl.checked : false;

        yearlyEl.checked = item.yearly;
        monthlyEl.checked = item.monthly;
        weeklyEl.checked = item.weekly;

        daysOfWeekEl.style.display = item.weekly ? 'block' : 'none';
    }

    item.weekdays = item.weekdays || (new Array(7)).fill(false);
    const day = (new Date(item.date)).getDate();
    const month = (new Date(item.date)).getMonth()+1;
    const dateFormatted = `${(new Date(item.date)).getFullYear()}-${month < 10 ? ('0'+month) : month}-${day < 10 ? ('0'+day) : day}`;

    return (
        <div>
        <form>
            <textarea 
            multiline={"true"}
            ref={el => textinput = el}
            defaultValue={item.text}
            onChange={() => item.text = textinput.value}
            rows={"8"}
            cols={"80"}
            />
            <div>
                date:<input 
                    ref={el => dateinput = el}
                    id="date" 
                    type="date"
                    defaultValue={dateFormatted}
                    onChange={()=>item.date=(new Date(dateinput.value)).valueOf()}/>
            </div>

            <div>
                <input 
                type="checkbox"
                checked = {item.yearly}
                ref={el => yearlyEl = el}
                onChange={() => {updatePeriod(yearlyEl)}}/>
                <label>yearly</label>
                
                <input 
                type="checkbox"
                checked = {item.monthly}
                ref={el => monthlyEl = el}
                onChange={() => {updatePeriod(monthlyEl)}}/>
                <label>monthly</label>

                <input 
                type="checkbox"
                checked = {item.weekly}
                ref={el => weeklyEl = el}
                onChange={() => {updatePeriod(weeklyEl)}}/>
                <label>weekly</label>
            </div>

            <div
            ref={el => daysOfWeekEl = el}
            style={{display:item.weekly ? 'block' : 'none'}}
            >
            {item.weekdays && item.weekdays.map((dayVal, idx) =>
                <span key={'day'+idx}>
                <input
                type="checkbox"
                defaultChecked={dayVal}
                ref={el => weekdayEls[idx] = el}
                onChange={() => {item.weekdays[idx] = weekdayEls[idx].checked;}}
                />
                <label>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}</label>
                </span>
                )}
            </div>

            <div>
                <div>
                <input type="checkbox" 
                defaultChecked={item.doable}
                ref={el => isDoableEl = el}
                onChange={()=>{
                    item.doable = isDoableEl.checked;
                    regularBlockEl.style.display = item.doable ? 'block' : 'none';
                }}
                />
                <label>doable</label>
                
                {<span 
                ref={el => regularBlockEl = el}
                style={{display:item.doable ? 'block' : 'none'}}>
                    <input type="checkbox" 
                        defaultChecked={item.daysPeriod}
                        ref={el => isRegularEl = el}
                        onChange={()=>{daysPeriodEl.disabled=!isRegularEl.checked}}
                    />
                    <label>every</label>
                    <input 
                        type="number"
                        defaultValue={item.daysPeriod}
                        disabled={!item.daysPeriod}
                        ref={el => daysPeriodEl = el}
                        onChange={()=>{item.daysPeriod = daysPeriodEl.valueAsNumber}}
                        min={1}
                        style={{width:"4em"}}
                    />
                    <label>days</label>
                </span>}
                </div>

                <div>
                    <label>remind in:</label>
                    <input 
                        type="number"
                        defaultValue={item.remindTerm || 0}
                        ref={el => remindTermEl = el}
                        onChange={()=>{item.remindTerm = remindTermEl.valueAsNumber}}
                        min={0}
                        style={{width:"4em"}}
                    />
                    <label>days</label>
                </div>

                <button
                onClick={()=>{onSave(item)}}>Save</button>
                <button
                onClick={()=>{onSave()}}>Cancel</button>
            </div>

        </form>
        </div>
    );
}

const mapStateToProps = state => {
    return {selected_id: state.select.id}
};

export default connect(
    mapStateToProps
  )(ItemEdit)