import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../types/cartTypes";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const res = await axios.get(`/api/products/${id}`);
  const { _id, name, image, countInStock, price } = res.data;
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: _id,
      name,
      image,
      countInStock,
      price,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeCartItem = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (shippingData) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: shippingData,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(shippingData));
};

export const savePaymentMethod = (paymentMethod) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: paymentMethod,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
};
