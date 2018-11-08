import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {changeSelect} from '../actions'

const Item = ({item, selected_id, changeSelect}) => {
    const selected = item.id === selected_id;
    const bkg = selected ? '#ffffaa' : '#ffffff';

    return (
        <div
        style={{
            backgroundColor:bkg,
            padding:"1em"
        }}
        onClick={()=>{changeSelect(item.id)}}
        >
            <div
            style={{
                whiteSpace: "pre-wrap"
            }}
            >
                {item.text}
            </div>
            {/* <div
            style={{
                float:"right",
                color: '#666666'
            }}>
                <i>{item.date.toDateString()}</i>
            </div> */}
        </div>
    )
    
}

const mapStateToProps = state => {
    return {selected_id: state.select.id}
};

const mapDispatchToProps = dispatch => ({
    changeSelect: id => dispatch(changeSelect(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Item)