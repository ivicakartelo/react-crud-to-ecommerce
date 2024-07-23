import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewPost } from './postsSlice'

export const AddPostForm = () => {
    console.log("The AddPostForm.js rendered") //// This logs when the component renders
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const onTitleChanged = (e) => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    //console.log(title)
    console.log(`Title: ${title}`)
const canSave = Boolean(title) && Boolean(content) && Boolean(addRequestStatus === 'idle')
const onSavePostClicked = async () => {
    if (canSave) {
        try {
            setAddRequestStatus('pending')
            await dispatch(addNewPost({title, content})).unwrap()
            setTitle('')
            setContent('')
            setError(null)
        } catch (err) {
            console.error('Failed to save the post: ', err)
            setError('Error saving the post')
        } finally {
            setAddRequestStatus('idle')
        }
    }
}

return (
    <section>
        <h2>Add a New Post</h2>
        <form>
            <label htmlFor="postTitle"> Post Title:</label>
            <input 
                placeholder="Enter your title"
                type="text"
                id="postTitle"
                name="postTitle"
                value={title}
                onChange={onTitleChanged}
            />
            <label htmlFor="postContent">Content:</label>
            <textarea
                placeholder="Enter your content"
                id="postContent"
                name="postContent"
                value={content}
                onChange={onContentChanged} 
            />
<button type="button" onClick={onSavePostClicked} disabled={!canSave}>
    Save Post
</button>
        </form>
        {error && <div>{error}</div>}
    </section>
)
}