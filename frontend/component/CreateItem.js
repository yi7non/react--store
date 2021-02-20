import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import Router from 'next/Router'
import Form from './styles/Form'
import Error from './ErrorMessage'
import formatMoney from '../lib/formatMoney'
import next from 'next'

const CRATE_ITEM_MUTATION = gql`
  mutation CRATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`

function CreateItem() {
  const [createItem, { loading, error }] = useMutation(CRATE_ITEM_MUTATION)

  const itemData = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0
  }

  const [item, setItem] = useState(itemData)
  const handleChange = e => {
    const { name, type, value } = e.target
    const val = type === 'number' ? parseInt(value) : value
    setItem({
      ...item,
      [name]: val
    })
  }
  return (
    <Form
      onSubmit={async e => {
        e.preventDefault()
        const res = await createItem({
          variables: {
            ...item
          }
        })
        Router.push({
          pathname: '/item',
          query: { id: res.data.createItem.id }
        })
      }}>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="title">
          Title
          <input
            onChange={handleChange}
            value={item.title}
            type="text"
            id="title"
            name="title"
            placeholder="title"
            required
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            onChange={handleChange}
            value={item.price}
            type="number"
            id="price"
            name="price"
            placeholder="price"
            required
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            onChange={handleChange}
            value={item.description}
            id="description"
            name="description"
            placeholder="Enter a Description"
            required
          />
        </label>
        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  )
}

export default CreateItem
