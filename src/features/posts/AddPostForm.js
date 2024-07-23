import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost, fetchPosts } from './postsSlice';

export const AddPostForm = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const [items, setItems] = useState([
        { title: 'Item1', content: 'Content for Item1', price: 10 },
        { title: 'Item2', content: 'Content for Item2', price: 20 },
        { title: 'Item3', content: 'Content for Item3', price: 30 }
    ]);

    // Ensure posts are fetched before rendering items
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleItemClick = async (item) => {
        // Check if the post already exists
        const existingPost = posts.find(post => post.title === item.title);
        if (existingPost) {
            console.log('Post already exists:', existingPost);
            return; // Do nothing if post already exists
        }

        try {
            // Dispatch thunk action to add the new post
            await dispatch(addNewPost(item)).unwrap();
        } catch (error) {
            console.error('Failed to add new post:', error);
        }
    };

    return (
        <section>
            <h2>Select an Item</h2>
            <ul>
                {items.map(item => (
                    <li key={item.title}>
                        <button onClick={() => handleItemClick(item)}>
                            {item.title} - ${item.price}
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};