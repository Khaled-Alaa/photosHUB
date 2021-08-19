import { createStore } from "redux";
import Reducer from "./app/appReducer";

const store = createStore(Reducer);

export default store;