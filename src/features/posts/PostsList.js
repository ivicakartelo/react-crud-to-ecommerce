import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, removeFromBasket, increaseQuantity, decreaseQuantity } from './postsSlice';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../../index.css'; // Ensure this path is correct

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
      <td className="border px-4 py-2">{post.title}</td>
      <td className="border px-4 py-2">{post.quantity}</td>
      <td className="border px-4 py-2">${post.price}</td>
      <td className="border px-4 py-2">${post.quantity * post.price}</td>
      <td className="border px-4 py-2 flex space-x-2">
        <button onClick={handleIncreaseQuantity} className="bg-blue-500 text-white px-2 py-1 rounded">+</button>
        <button onClick={handleDecreaseQuantity} className="bg-blue-500 text-white px-2 py-1 rounded">-</button>
        <button onClick={handleRemoveClick} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
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

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30
    });

    const totalAmount = basket.reduce((total, post) => total + (post.quantity * post.price), 0);
    doc.text(`Total: $${totalAmount}`, 20, doc.lastAutoTable.finalY + 10);

    doc.save('invoice.pdf');
  };

  const totalAmount = basket.reduce((total, post) => total + (post.quantity * post.price), 0);

  let content;

  if (status === 'loading') {
    content = <h1 className="text-2xl font-bold">Loading...</h1>;
  } else if (status === 'succeeded') {
    content = (
      <>
        <table className="table-auto w-full border-collapse border border-gray-200 mt-8">
          <thead>
            <tr>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Total</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {basket.map((post) => (
              <PostExcerpt key={post.id} post={post} />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="border px-4 py-2">Total</td>
              <td className="border px-4 py-2">${totalAmount}</td>
              <td className="border px-4 py-2"></td>
            </tr>
          </tfoot>
        </table>
        <button onClick={handleGenerateInvoice} className="bg-green-500 text-white px-4 py-2 mt-4 rounded">
          Generate Invoice
        </button>
      </>
    );
  } else if (status === 'failed') {
    content = <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold">Basket</h2>
      {content}
    </section>
  );
};