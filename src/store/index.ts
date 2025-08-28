// Import necessary libraries for Redux store and state persistence
import rootReducer from './rootReducer';  // Combines all reducers into one
import { configureStore } from '@reduxjs/toolkit';  // Configures the Redux store
import { persistReducer, persistStore } from 'redux-persist';  // For persisting the Redux state
import storage from 'redux-persist/lib/storage';  // Default storage (localStorage)

const persistConfig = {
  key: 'app-keys',
  storage,
  whitelist: ['authSlice','menuSlice'],
};

// Wrap the rootReducer with persistReducer to handle persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create and configure the Redux store
const store = configureStore({
  reducer: persistedReducer,  // Use the persisted reducer for the store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),  // Disable serializability check for persisted state
});


// Set up persistence for the store
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the store and persistor for use in the app (needed for PersistGate)
export { store, persistor };
