// fetchProducts.js
import fetch from "isomorphic-unfetch";

import {
  fetchProductsPending,
  fetchProductsSuccess,
  fetchProductsError,
} from "./actions";

const fetchProducts = (searchValue) => {
  return async (dispatch) => {
    dispatch(fetchProductsPending());
    const url = `https://jsonmock.hackerrank.com/api/cities/?city=${searchValue}`;
    const res = await fetch(url);
    const json = await res.json();
    if (res.error) {
      dispatch(fetchProductsError(res.error));
      return;
    }
    dispatch(fetchProductsSuccess(json));
    return json;
  };
};

export default fetchProducts;
