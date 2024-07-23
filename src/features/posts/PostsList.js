import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts, handleDelete } from './postsSlice'
import { UpdatePostForm } from './UpdatePostForm'

const PostExcerpt = ({ post }) => {
    console.log("The PostExcerpt rendered")
    const [showEditForm, setShowEditForm] = useState(false);
    const [updateId, setUpdateId] = useState('')
    const dispatch = useDispatch()

    const handleUpdate = (id) => {
        setUpdateId(id);
        setShowEditForm(true);
      }      
    return (
        <article key={post.id}>

            <h3>{post.title}</h3>
            <p>{post.content}</p>

            {showEditForm && updateId === post.id ? (
                <UpdatePostForm
                    post={post}
                    setShowEditForm={setShowEditForm}
                />
                ) : (
                <button onClick={() => handleUpdate(post.id)}>
                    Update
                </button>
            )}
            <button onClick={() => dispatch(handleDelete(post.id))}>Delete</button>
        </article>
    )
}
export const PostsList = () => {
    console.log("The PostsList rendered")
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts.posts)
    console.log(posts)
    const status = useSelector(state => state.posts.status)
    console.log(status)
    const error = useSelector(state => state.posts.error)
    console.log(error)
  
    useEffect(() => {
        status === 'idle' && dispatch(fetchPosts())
    },[status, dispatch])

let content

status === 'loading' ? (
    content = <h1>Loading...</h1>
) : status === 'succeeded' ? (
    content = posts.map(post => <PostExcerpt key={post.id} post={post} />)
) : (
    content = <div>Error: {error}</div>
)

    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    )
}