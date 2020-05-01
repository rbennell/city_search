// fetchCities.js
import fetch from "isomorphic-unfetch";

import {
  fetchCitiesPending,
  fetchCitiesSuccess,
  fetchCitiesError,
} from "./actions";

const fetchCities = (searchValue) => {
  return async (dispatch) => {
    dispatch(fetchCitiesPending());
    const url = `https://jsonmock.hackerrank.com/api/cities/?city=${searchValue}`;
    const res = await fetch(url);
    const json = await res.json();
    if (res.error) {
      dispatch(fetchCitiesError(res.error));
      return;
    }
    dispatch(fetchCitiesSuccess(json));
    return json;
  };
};

export default fetchCities;
