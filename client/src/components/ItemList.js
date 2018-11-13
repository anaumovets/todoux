import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Item from './Item'

const ItemList = ({items}) => {
  return (
    <div>
        {items.map(item =>
        <Item
            key={item.id}
            item={item}
        />
        )}
    </div>
  );
}

ItemList.propTypes = {
  items: PropTypes.array.isRequired
}

export default ItemList