import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  posts: [],
  basket: [],
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get('https://63fa8c1e7a045e192b5bd47a.mockapi.io/post2');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addToBasket(state, action) {
      const existingPost = state.basket.find(post => post.id === action.payload.id);
      if (existingPost) {
        existingPost.quantity += 1;
      } else {
        state.basket.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromBasket(state, action) {
      state.basket = state.basket.filter(post => post.id !== action.payload);
    },
    increaseQuantity(state, action) {
      const post = state.basket.find(post => post.id === action.payload);
      if (post) {
        post.quantity += 1;
      }
    },
    decreaseQuantity(state, action) {
      const post = state.basket.find(post => post.id === action.payload);
      if (post) {
        post.quantity = Math.max(post.quantity - 1, 1);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addToBasket, removeFromBasket, increaseQuantity, decreaseQuantity } = postsSlice.actions;
export default postsSlice.reducer;