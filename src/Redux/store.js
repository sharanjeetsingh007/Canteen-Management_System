import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import authReducer from './slice';
import userBoolen from './userBoolen';
import cartReducer from './cart'
import sidebarReducer from './sidebar';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'persist-key',
    storage,
};

const reducers = combineReducers({ cart: cartReducer });
const persistedReducer = persistReducer(persistConfig, reducers);


export default configureStore({
    reducer: {
        user: authReducer,
        userBoolen: userBoolen,
        // cart: cartReducer,
        sidebar: sidebarReducer,
        reducer: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })

})