import { combineReducers } from "redux";
import auth from './auth';
import books from './books';
import borrow from './borrow';
import author from './author';
import genre from './genre';

export default combineReducers({
    auth,
    books,
    borrow,
    author,
    genre
})