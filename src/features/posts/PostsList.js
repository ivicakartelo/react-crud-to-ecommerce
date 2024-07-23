import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, handleDelete } from './postsSlice';

// PostExcerpt component for displaying individual post details
const PostExcerpt = ({ post, onUpdateQuantity }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(0); // Local state for quantity

    const handleDeleteClick = () => {
        dispatch(handleDelete(post.id));
    };

    const handleIncreaseQuantity = () => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity + 1;
            onUpdateQuantity(post.id, newQuantity); // Notify parent of quantity change
            return newQuantity;
        });
    };

    const handleDecreaseQuantity = () => {
        setQuantity(prevQuantity => {
            const newQuantity = Math.max(prevQuantity - 1, 0);
            onUpdateQuantity(post.id, newQuantity); // Notify parent of quantity change
            return newQuantity;
        });
    };

    return (
        <tr key={post.id}>
            <td>{post.title}</td>
            <td>${post.price.toFixed(2)}</td> {/* Display the price with 2 decimal places */}
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
    const [quantities, setQuantities] = useState({}); // Track quantities of posts

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    const handleUpdateQuantity = (postId, newQuantity) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [postId]: newQuantity
        }));
    };

    const calculateTotal = () => {
        return posts.reduce((total, post) => {
            const quantity = quantities[post.id] || 0;
            return total + post.price * quantity; // Calculate total by multiplying price and quantity
        }, 0).toFixed(2);
    };

    let content;

    if (status === 'loading') {
        content = <h1>Loading...</h1>;
    } else if (status === 'succeeded') {
        content = (
            <>
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
                            <PostExcerpt
                                key={post.id}
                                post={post}
                                onUpdateQuantity={handleUpdateQuantity}
                            />
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="2"><strong>Total</strong></td>
                            <td colSpan="2">${calculateTotal()}</td> {/* Display the total amount */}
                        </tr>
                    </tfoot>
                </table>
            </>
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