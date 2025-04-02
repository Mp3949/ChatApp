// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import messageReducer from './msgSlice.js';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { combineReducers } from 'redux';
import socketReducer from './socketSlice.js';

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  socket:socketReducer
});

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  // Optional: specify which reducers to persist
  // whitelist: ['user'], // only persist user reducer
  // blacklist: ['message'], // don't persist message reducer
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);