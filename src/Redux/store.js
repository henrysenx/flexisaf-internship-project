import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import noteReducer from "./Reducers/noteReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";

const middleware = [reduxThunk];

const reducers = combineReducers({
  NoteReducer: noteReducer,
});

export const myStore = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);
