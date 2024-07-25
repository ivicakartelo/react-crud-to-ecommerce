import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, addToBasket } from './postsSlice';
import '../../index.css'; // Ensure this path is correct
export const AddPostForm = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const [items, setItems] = useState([
    { id: '1', title: 'Item1', content: 'Content for Item1', price: 10, image: 'image1.jpg' },
    { id: '2', title: 'Item2', content: 'Content for Item2', price: 20, image: 'image2.jpg' },
    { id: '3', title: 'Item3', content: 'Content for Item3', price: 30, image: 'image3.jpg' }
  ]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleItemClick = (item) => {
    const existingPost = posts.find(post => post.title === item.title);
    if (existingPost) {
      console.log('Post already exists:', existingPost);
      return;
    }

    dispatch(addToBasket(item));
  };

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Select an Item</h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map(item => (
          <li key={item.id} className="border p-4 rounded-lg shadow-md">
            <button
              onClick={() => handleItemClick(item)}
              className="text-lg font-medium text-blue-600 hover:underline"
            >
              {item.title}
            </button>
            <p className="mt-2">{item.content}</p>
            <img
              src={`/images/${item.image}`}
              alt={item.title}
              className="mt-4 w-full h-32 object-cover"
            />
            <p className="mt-2 font-bold">${item.price}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};