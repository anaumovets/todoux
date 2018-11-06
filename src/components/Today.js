import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Item from './Item'

const Today = ({items}) => {
  console.log("items:", JSON.stringify(items));
  return (
    <ul>
        {items.map(item =>
        <Item
            key={item.id}
            item={item}
        />
        )}
    </ul>
  );
}

Today.propTypes = {
  items: PropTypes.array.isRequired
}

const mapStateToProps = state => {return {items: state.items.list}}

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Today)