import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {toggleSelect} from '../actions'

const Item = ({item, selected_id, toggleSelect}) => {
    const selected = item.id === selected_id;
    const bkg = selected ? '#ffff00' : '#ffffff';

    return (
        <div
        style={{
            backgroundColor:bkg,
            width:"20em",
            whiteSpace: "pre-wrap"
        }}
        onClick={()=>{toggleSelect(item.id)}}
        >
            {item.text}
        </div>
    )
    
}

const mapStateToProps = state => {
    return {selected_id: state.select.id}
};

const mapDispatchToProps = dispatch => ({
    toggleSelect: id => dispatch(toggleSelect(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Item)