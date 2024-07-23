import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://63fa8c1e7a045e192b5bd47a.mockapi.io/post2');
  
  return response.data;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
  const response = await axios.post('https://63fa8c1e7a045e192b5bd47a.mockapi.io/post2', initialPost);
  console.log(initialPost)
  return response.data;
});

export const handleDelete = createAsyncThunk('posts/handleDelete', async (id) => {
  const response = await axios.delete(`https://63fa8c1e7a045e192b5bd47a.mockapi.io/post2/${id}`);
  console.log(response.data)
  return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, title, content }) => {
  await axios.put(`https://63fa8c1e7a045e192b5bd47a.mockapi.io/post2/${id}`, {
    title,
    content,
  });
  return { id, title, content };
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = state.posts.concat(action.payload);
        state.status = 'succeeded';
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(handleDelete.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(handleDelete.fulfilled, (state, action) => {
        const id = action.payload.id;
        state.posts = state.posts.filter((post) => post.id !== id);
        state.status = 'succeeded';
      })
      .addCase(handleDelete.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updatePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { id, title, content } = action.payload;
        const existingPost = state.posts.find((post) => post.id === id);
        if (existingPost) {
          existingPost.title = title;
          existingPost.content = content;
        }
        state.status = 'succeeded';
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = 'failed'
        state.error = "Update failed"
        state.error = action.error.message;
      })
    }
  })
export default postsSlice.reducer;
