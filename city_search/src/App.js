import React, { useState, useEffect } from "react";
import "./App.css";

import { createStore } from "redux";
// import cities from "./reducers";
import { setCities } from "./actions";

import Spinner from "./components/spinner";
import CitiesTable from "./components/citiesTable";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import fetchProducts from "./fetchProducts";

import {
  getProductsError,
  getProducts,
  getProductsPending,
  getProductsSearched,
  getTotal,
} from "./reducer";

const validateSearchValue = (searchValue) =>
  Boolean(searchValue.match(/^[a-zA-Z]+$/));

const submitSearch = (
  e,
  fetchProductsAction,
  searchValue,
  setValidationError
) => {
  e.preventDefault();
  const isValid = validateSearchValue(searchValue);
  setValidationError(!isValid);
  if (!isValid) {
    return;
  }
  fetchProductsAction(searchValue);
};

const updateSearchValue = (e, setSearchValue, setValidationError) => {
  setValidationError(false);
  setSearchValue(e.target.value);
};

function App({ error, cities, fetchProductsAction, pending, searched, total }) {
  const [searchValue, setSearchValue] = useState("");
  const [validationError, setValidationError] = useState(false);
  return (
    <div className="App">
      <form
        onSubmit={(e) =>
          submitSearch(e, fetchProductsAction, searchValue, setValidationError)
        }
      >
        <input
          name="search"
          onChange={
            (e) => updateSearchValue(e, setSearchValue, setValidationError)
            // setValidationError(false) && setSearchValue(e.target.value)
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
  cities: getProducts(state),
  error: getProductsError(state),
  pending: getProductsPending(state),
  searched: getProductsSearched(state),
  total: getTotal(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchProductsAction: fetchProducts,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
