// reducer.js

import {
  FETCH_CITIES_PENDING,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_ERROR,
} from "./actions";

import initialState from "./initialState";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CITIES_PENDING:
      return {
        ...state,
        pending: true,
        searched: true,
      };
    case FETCH_CITIES_SUCCESS:
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
    case FETCH_CITIES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const getCities = (state) => state.cities;
export const getCitiesError = (state) => state.error;
export const getCitiesPending = (state) => state.pending;
export const getCitiesSearched = (state) => state.searched;
export const getTotal = (state) => state.total;

export default reducer;
