import { applyMiddleware, compose, createStore } from "redux";

import thunkMiddleware from "redux-thunk";
import rootReducer from "./rootReducers";

const configureStore = (preloadedState) => {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];

  const composeEnhancersDevtool =
    import.meta.env.NODE_ENV !== "production" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          name: "MyApp",
          actionsBlacklist: ["REDUX_STORAGE_SAVE"],
        })
      : compose;

  const composedEnhancers = composeEnhancersDevtool(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
};

export default configureStore;
