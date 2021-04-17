import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Title from './styles/Title'
import ItemStyles from './styles/ItemStyles'
import PriceTag from './styles/PriceTag'
import fomatMoney from '../lib/formatMoney'
import DeleteItem from './DeleteItem'

function Item({ item }) {
  return (
    <ItemStyles>
      {item.image && <img src={item.image} alt={item.title} />}
      <Title>
        <Link
          href={{
            pathname: '/item',
            query: { id: item.id }
          }}>
          <a>{item.title}</a>
        </Link>
      </Title>
      <PriceTag>{fomatMoney(item.price)}</PriceTag>
      <p>{item.description}</p>
      <div className="buttonList">
        <Link href={{ pathname: '/update', query: { id: item.id } }}>
          <a>Edit ✏</a>
        </Link>
        <button>Add To Cart</button>
        <DeleteItem id={item.id}>Delete this item ❌</DeleteItem>
      </div>
    </ItemStyles>
  )
}

Item.propTypes = {
  item: PropTypes.object.isRequired
}
// Here is an example documenting the different validators provided:
// https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes

export default Item
