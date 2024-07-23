import React from 'react';
import { useDispatch } from 'react-redux';
import { addNewPost } from './postsSlice';

export const AddPostForm = () => {
    const dispatch = useDispatch();

    const posts = [
        { title: 'Post1', content: 'Content for Post1' },
        { title: 'Post2', content: 'Content for Post2' },
        { title: 'Post3', content: 'Content for Post3' }
    ];

    const handleItemClick = async (post) => {
        try {
            // Dispatch thunk action to add the new post
            await dispatch(addNewPost(post)).unwrap();
        } catch (error) {
            console.error('Failed to add new post: ', error);
        }
    };

    return (
        <section>
            <h2>Select an Item</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.title}>
                        <button onClick={() => handleItemClick(post)}>
                            {post.title}
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};