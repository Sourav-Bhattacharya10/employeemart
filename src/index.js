import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
// import { createStore, applyMiddleware, compose } from "redux";
// import createSagaMiddleware from "redux-saga";
// import { fromJS } from "immutable";
import createHistory from "history/createBrowserHistory";
// import { persistStore, autoRehydrate } from "redux-persist-immutable";
//import createReducer from "./reducers";
import configureStore from "./configureStore";
import * as serviceWorker from "./serviceWorker";

const initialState = {};
// let sagas = [];

// Create redux store with history
//const initialState = {};
const history = createHistory();

configureStore(
  initialState,
  history
)((store) => {
  storeConfigured(store);
});

// const sagaMiddleware = createSagaMiddleware();

// const middlewares = [sagaMiddleware];

// const enhancers = [applyMiddleware(...middlewares)];
// enhancers.push(autoRehydrate());

// const composeEnhancers = compose;

// const store = createStore(
//   createReducer,
//   fromJS(initialState),
//   composeEnhancers(...enhancers)
// );

// // Extensions
// store.runSaga = sagaMiddleware.run;
// // sagas.map(store.runSaga);
// store.injectedReducers = {}; // Reducer registry
// store.injectedSagas = {}; // Saga registry

// store.replaceReducer(createReducer(store.injectedReducers));
// module;
//persistStore(store, { blacklist: ['route', 'form'] }, () => done(store));

const storeConfigured = (store) => {
  // Creating root node using ReactDOM

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
