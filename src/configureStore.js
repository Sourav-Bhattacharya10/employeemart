/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from "redux";
import { fromJS } from "immutable";
import { routerMiddleware } from "react-router-redux";
// import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { persistStore, autoRehydrate } from "redux-persist-immutable";
import createReducer from "./reducers";
import sagas from "./saga";

// const loggerMiddleware = createLogger({
//   collapsed: (getState, action, logEntry) => !logEntry.error,
// });

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  // Create the store with middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  //   if (process.env.NODE_ENV !== "production") {
  //     // 3. loggerMiddleware: Make logging available in browser console
  //     middlewares.push(loggerMiddleware);
  //   }

  const enhancers = [applyMiddleware(...middlewares)];

  /* istanbul ignore next */
  if (process.env.NODE_ENV !== "test") {
    enhancers.push(autoRehydrate());
  }

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== "production" &&
    typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // TODO Try to remove when `react-router-redux` is out of beta,
          // LOCATION_CHANGE should not be fired more than once after hot reloading
          // Prevent recomputing reducers for `replaceReducer`
          shouldHotReload: false,
        })
      : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  sagas.map(store.runSaga);
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot re-loadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return (done) => {
    // Un-comment following lines to enable persistance to local-storage.
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== "test") {
      persistStore(store, { blacklist: ["route", "form"] }, () => done(store));
    }
  };
}
