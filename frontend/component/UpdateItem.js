import React, { useState, useEffect } from 'react'
import { useMutation, useQuery, gql } from '@apollo/client'
import Router, { useRouter } from 'next/Router'
import Form from './styles/Form'
import Error from './ErrorMessage'
import formatMoney from '../lib/formatMoney'
import next from 'next'

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION($id: ID!, $title: String, $description: String, $price: Int) {
    updateItem(id: $id, title: $title, description: $description, price: $price) {
      id
    }
  }
`
const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      price
      description
    }
  }
`

function UpdateItem({ id }) {
  const { data, loading: singleLoading, error: singleError } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id
    }
  })
  const [updateItem, { loading, error }] = useMutation(UPDATE_ITEM_MUTATION)

  const [item, setItem] = useState({})

  useEffect(() => {
    if (data) {
      setItem({
        ...data.item
      })
    }
  }, [data])

  const handleChange = e => {
    const { name, type, value } = e.target
    const val = type === 'number' ? parseInt(value) : value
    setItem({
      ...item,
      [name]: val
    })
  }

  if (singleError) return <Error error={error} />
  if (singleLoading) return <p>Loding...</p>
  return (
    <Form
      onSubmit={async e => {
        e.preventDefault()
        const res = await updateItem({
          variables: {
            id,
            ...item
          }
        })
      }}>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="title">
          Title
          <input
            onChange={handleChange}
            defaultValue={item.title}
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
            defaultValue={item.price}
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
            defaultValue={item.description}
            id="description"
            name="description"
            placeholder="Enter a Description"
            required
          />
        </label>
        <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
      </fieldset>
    </Form>
  )
}

export default UpdateItem
export { UPDATE_ITEM_MUTATION }
