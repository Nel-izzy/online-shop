import {configureStore} from '@reduxjs/toolkit';
import {productListReducer, productDetailsReducer} from './reducer/productReducers';
import {cartReducer} from './reducer/cartReducer';

const localStorageCartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')): []

const preloadedState = {
 cart: {
    cartItems: localStorageCartItems
 }
}

const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer
    },
    preloadedState
})



export default store;