import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers";
import { AsyncStorage } from "react-native";
import { persistStore, autoRehydrate } from "redux-persist";
import { logger } from "redux-logger";
export default function configureStore() {
  const store = createStore(
    reducer,
    applyMiddleware(thunk, logger),
    autoRehydrate()
  );

  const config = {
    storage: AsyncStorage,
    balcklist: ["error"]
  };

  persistStore(store, config, () => {
    // console.log("restored reducers")
  });

  return store;
}
