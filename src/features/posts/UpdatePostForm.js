import { useState } from 'react';
import { updatePost } from './postsSlice';
import { useDispatch } from 'react-redux';

export const UpdatePostForm = ({ post, setShowEditForm }) => {
  console.log("The UpdatePostForm.js rendered")
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const dispatch = useDispatch()
console.log(title)
console.log(content)
  const canSave = Boolean(title) && Boolean(content);

  const onUpdatePostClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
        dispatch(updatePost({ id: post.id, title: title, content: content }))
        setShowEditForm(false)
    }   
    console.log("The UpdatePostForm.js rendered")
  }
  return (
    <form onSubmit={onUpdatePostClicked}>
      <label htmlFor="postTitleEdit">Title</label>
      <input  
        id="postTitleEdit"
        name="postTitleEdit"
        placeholder="Edit your title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} />

      <label htmlFor="postContentEdit">Content</label>
      <textarea  
      id="postContentEdit"
      name="postContentEdit"
        placeholder="Edit your content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button type="submit" disabled={!canSave}>
        Update
      </button>
      <button type="button" onClick={() => setShowEditForm(false)}>
        Cancel
      </button>
    </form>
  );
};

export default UpdatePostForm