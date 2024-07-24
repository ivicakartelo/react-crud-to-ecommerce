import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, addToBasket } from './postsSlice';

export const AddPostForm = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const [items, setItems] = useState([
    { id: '1', title: 'Item1', content: 'Content for Item1', price: 10, image: 'image1.jpg' },
    { id: '2', title: 'Item2', content: 'Content for Item2', price: 20, image: 'image2.jpg' },
    { id: '3', title: 'Item3', content: 'Content for Item3', price: 30, image: 'image3.jpg' }
  ]);

  // Ensure posts are fetched before rendering items
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleItemClick = (item) => {
    // Check if the post already exists in the basket
    const existingPost = posts.find(post => post.title === item.title);
    if (existingPost) {
      console.log('Post already exists:', existingPost);
      return; // Do nothing if post already exists
    }

    // Dispatch action to add the new post to the basket
    dispatch(addToBasket(item));
  };

  return (
    <section>
      <h2>Select an Item</h2>
      <ul className="item-list">
        {items.map(item => (
          <li key={item.id} className="item">
            <button onClick={() => handleItemClick(item)}>
              {item.title}
            </button>
            <p>{item.content}</p>
            <img src={`/images/${item.image}`} alt={item.title} />
          </li>
        ))}
      </ul>
    </section>
  );
};