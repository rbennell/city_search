import React, { useState, useEffect } from "react";
import "./App.css";
import "./custom.scss";

import Spinner from "./components/spinner";
import CitiesTable from "./components/citiesTable";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import fetchCities from "./fetchCities";

import {
  getCitiesError,
  getCities,
  getCitiesPending,
  getCitiesSearched,
  getTotal,
} from "./reducer";

const validateSearchValue = (searchValue) =>
  Boolean(searchValue.match(/^[a-zA-Z]+$/));

const submitSearch = (
  e,
  fetchCitiesAction,
  searchValue,
  setValidationError
) => {
  e.preventDefault();
  const isValid = validateSearchValue(searchValue);
  setValidationError(!isValid);
  if (!isValid) {
    return;
  }
  fetchCitiesAction(searchValue);
};

const updateSearchValue = (e, setSearchValue, setValidationError) => {
  setValidationError(false);
  setSearchValue(e.target.value);
};

function App({ error, cities, fetchCitiesAction, pending, searched, total }) {
  const [searchValue, setSearchValue] = useState("");
  const [validationError, setValidationError] = useState(false);
  return (
    <div className="App">
      <form
        onSubmit={(e) =>
          submitSearch(e, fetchCitiesAction, searchValue, setValidationError)
        }
      >
        <input
          name="search"
          onChange={(e) =>
            updateSearchValue(e, setSearchValue, setValidationError)
          }
        />
        <input type="submit" />
        {validationError ? "Please provide the valid input" : null}
        {error ? `The following error occurred ${error}` : null}
      </form>
      {pending ? (
        <Spinner />
      ) : searched && !error ? (
        <CitiesTable cities={cities} total={total} />
      ) : null}
    </div>
  );
}
const mapStateToProps = (state) => ({
  cities: getCities(state),
  error: getCitiesError(state),
  pending: getCitiesPending(state),
  searched: getCitiesSearched(state),
  total: getTotal(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchCitiesAction: fetchCities,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
