import React from 'react';
import { AddPostForm } from './features/posts/AddPostForm';
import { PostsList } from './features/posts/PostsList';
import './App.css'; // Import App-specific styles if you have any

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <AddPostForm />
      <PostsList />
    </div>
  );
};

export default App;