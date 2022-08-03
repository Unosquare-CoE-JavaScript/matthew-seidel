import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_POSTS } from '../queries'

export const Posts = () => {
    const {loading, error, data} = useQuery(GET_POSTS);
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
  return (
    <pre>
        {JSON.stringify(data, null, 2)}
    </pre>
  )
}
