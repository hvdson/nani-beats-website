import allReducers from './reducers';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const initialState = {};
const middleware = [thunk];
const store = createStore(
  allReducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (a) => a
  )
);
export default store;