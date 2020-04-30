// reducer.js

import {
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
} from "./actions";

import initialState from "./initialState";

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_PENDING:
      return {
        ...state,
        pending: true,
        searched: true,
      };
    case FETCH_PRODUCTS_SUCCESS:
      console.log(action);
      const { total, data } = action.cities;
      const cities = data.reduce((acc, value) => {
        const { city, state } = value;
        if (!acc[state]) {
          acc[state] = [];
        }
        acc[state].push(city);
        return acc;
      }, {});
      return {
        ...state,
        cities,
        pending: false,
        total,
      };
    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const getProducts = (state) => state.cities;
export const getProductsError = (state) => state.error;
export const getProductsPending = (state) => state.pending;
export const getProductsSearched = (state) => state.searched;
export const getTotal = (state) => state.total;

export default productsReducer;
