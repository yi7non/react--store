import React from 'react'
import { useMutation, gql, useApolloClient } from '@apollo/client'
import { ALL_ITEMS_QUERY } from './Items'
import { CRATE_ITEM_MUTATION } from './CreateItem'
const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`

function DeleteItem({ children, id }) {
  const client = useApolloClient()
  const updateCash = id => {
    const { items } = client.readQuery({
      query: ALL_ITEMS_QUERY,
      variables: {
        id
      }
    })

    const newItems = items.filter(item => item.id !== id)
    client.writeQuery({
      query: ALL_ITEMS_QUERY,
      data: {
        items: newItems
      }
    })
  }

  const [deleteItem, { loading, error }] = useMutation(DELETE_ITEM_MUTATION)
  return (
    <button
      onClick={() => {
        if (confirm('Are you sure?')) {
          deleteItem({ variables: { id } }).then(payload => updateCash(payload.data.deleteItem.id))
        }
      }}>
      {children}
    </button>
  )
}

export default DeleteItem
