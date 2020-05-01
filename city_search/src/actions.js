export const FETCH_CITIES_PENDING = "FETCH_CITIES_PENDING";
export const FETCH_CITIES_SUCCESS = "FETCH_CITIES_SUCCESS";
export const FETCH_CITIES_ERROR = "FETCH_CITIES_ERROR";

export function fetchCitiesPending() {
  return {
    type: FETCH_CITIES_PENDING,
  };
}

export function fetchCitiesSuccess(cities) {
  return {
    type: FETCH_CITIES_SUCCESS,
    cities,
  };
}

export function fetchCitiesError(error) {
  return {
    type: FETCH_CITIES_ERROR,
    error,
  };
}
