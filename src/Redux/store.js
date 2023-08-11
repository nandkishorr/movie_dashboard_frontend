import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import userReducer from "./users/user.reducer";
import thunk from "redux-thunk";
import { movieReducer } from "./movies/movie.reducer";

let rootReducer = combineReducers({
    userReducer: userReducer,
    movieReducer: movieReducer
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))