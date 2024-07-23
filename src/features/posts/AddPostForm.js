import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost, fetchPosts } from './postsSlice';

export const AddPostForm = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const [items] = React.useState([
        { title: 'Item1', content: 'Content for Item1' },
        { title: 'Item2', content: 'Content for Item2' },
        { title: 'Item3', content: 'Content for Item3' }
    ]);

    // Ensure posts are fetched before handling item clicks
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
                            {item.title}
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};