import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Item from './Item'

const ItemList = ({items}) => {
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

ItemList.propTypes = {
  items: PropTypes.array.isRequired
}

export default ItemList