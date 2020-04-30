// action.js

export const FETCH_PRODUCTS_PENDING = "FETCH_PRODUCTS_PENDING";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";

export function fetchProductsPending() {
  return {
    type: FETCH_PRODUCTS_PENDING,
  };
}

export function fetchProductsSuccess(cities) {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    cities,
  };
}

export function fetchProductsError(error) {
  return {
    type: FETCH_PRODUCTS_ERROR,
    error,
  };
}
