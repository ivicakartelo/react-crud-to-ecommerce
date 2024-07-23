import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, handleDelete } from './postsSlice';

const PostExcerpt = ({ post }) => {
    const dispatch = useDispatch();

    const handleDeleteClick = () => {
        dispatch(handleDelete(post.id));
    };

    return (
        <tr key={post.id}>
            <td>{post.title}</td>
            <td>
                <button onClick={handleDeleteClick}>Delete</button>
            </td>
        </tr>
    );
};

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
            <h2>Posts</h2>
            {content}
        </section>
    );
};