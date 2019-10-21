import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loading } from './http';
import { regions } from './regions';
import { wines } from './wines';
import { currentWine } from './currentWine';

// here combineReducers is use to split the main reducer into smaller ones
export const reducer = combineReducers({
  // this one is a special reducer to sync the router with the redux store
  routing: routerReducer,
  loading,
  regions,
  wines,
  currentWine
});
