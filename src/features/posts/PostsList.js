import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, removeFromBasket, increaseQuantity, decreaseQuantity } from './postsSlice';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PostExcerpt = ({ post }) => {
  const dispatch = useDispatch();

  const handleRemoveClick = () => {
    dispatch(removeFromBasket(post.id));
  };

  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(post.id));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(post.id));
  };

  return (
    <tr key={post.id}>
      <td>{post.title}</td>
      <td>{post.quantity}</td>
      <td>{post.price}</td>
      <td>{post.quantity * post.price}</td>
      <td>
        <button onClick={handleIncreaseQuantity}>+</button>
        <button onClick={handleDecreaseQuantity}>-</button>
        <button onClick={handleRemoveClick}>Remove</button>
      </td>
    </tr>
  );
};

export const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const basket = useSelector((state) => state.posts.basket);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const handleGenerateInvoice = () => {
    const doc = new jsPDF();
    doc.text('Invoice', 20, 20);
    const tableColumn = ["Title", "Quantity", "Price", "Total"];
    const tableRows = [];

    basket.forEach(post => {
      const postData = [
        post.title,
        post.quantity,
        post.price,
        post.quantity * post.price
      ];
      tableRows.push(postData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 30 });
    doc.save('invoice.pdf');
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
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {basket.map((post) => (
              <PostExcerpt key={post.id} post={post} />
            ))}
          </tbody>
        </table>
        <button onClick={handleGenerateInvoice}>Generate Invoice</button>
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