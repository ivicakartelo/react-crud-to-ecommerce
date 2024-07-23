import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, handleDelete, addNewPost } from './postsSlice';

// PostExcerpt component for displaying individual post details
const PostExcerpt = ({ post }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(0); // Local state for quantity

    const handleDeleteClick = () => {
        dispatch(handleDelete(post.id));
    };

    const handleIncreaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1); // Increase quantity by 1
    };

    const handleDecreaseQuantity = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 0)); // Decrease quantity by 1, ensure it doesn't go below 0
    };

    return (
        <tr key={post.id}>
            <td>{post.title}</td>
            <td>${post.price}</td> {/* Display the price */}
            <td>{quantity}</td> {/* Display the local quantity */}
            <td>
                <button onClick={handleIncreaseQuantity}>+</button> {/* Button to increase quantity */}
                <button onClick={handleDecreaseQuantity}>-</button> {/* Button to decrease quantity */}
                <button onClick={handleDeleteClick}>Remove</button>
            </td>
        </tr>
    );
};

// PostsList component for displaying the list of posts in a table
export const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const status = useSelector((state) => state.posts.status);
    const error = useSelector((state) => state.posts.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    let content;

    if (status === 'loading') {
        content = <h1>Loading...</h1>;
    } else if (status === 'succeeded') {
        content = (
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th> {/* Header for price */}
                        <th>Quantity</th> {/* Header for quantity */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <PostExcerpt key={post.id} post={post} />
                    ))}
                </tbody>
            </table>
        );
    } else if (status === 'failed') {
        content = <div>Error: {error}</div>;
    }

    return (
        <section>
            <h2>Basket</h2>
            {content}
        </section>
    );
};