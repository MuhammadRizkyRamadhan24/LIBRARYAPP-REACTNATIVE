import axios from 'axios';
import { API_URL } from '@env';

export const newArrivals = (token) => {
  return {
    type: 'NEWARRIVALS',
    payload: axios({
      method: 'GET',
      url: API_URL + `books/search?search=&order=added_at&sort=desc&limit=6&page=1`,
      headers: {
        Authorization: token
        }
    }),
  };
};

export const latestBooks = (token) => {
    return {
      type: 'LATESTBOOKS',
      payload: axios({
        method: 'GET',
        url: API_URL + `books/search?search=&order=added_at&sort=asc&limit=6&page=1`,
        headers: {
          Authorization: token
          }
      }),
    };
};

export const getBookById = (token, id) => {
    return {
      type: 'BOOKBYID',
      payload: axios({
        method: 'GET',
        url: API_URL + `books/${id}`,
        headers: {
          Authorization: token
          }
      }),
    };
};

export const getSearch = (token, search, page) =>{
  return {
      type: 'SEARCH',
      payload:  axios({
               method: 'GET',
               url: API_URL + `books/search?search=${search}&order=title&sort=asc&limit=4&page=${page}`,
               headers: {
                   Authorization: token
               }
           })
  };
};

export const addBook = (formdata, token) =>{
  return {
      type: 'ADDBOOK',
      payload: axios({
          method: 'POST',
          url: API_URL + 'books',
          data: formdata,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          }
      })
  };
};

export const editBook = (token, formdata, id) =>{
  return {
      type: 'EDITBOOK',
      payload: axios({
          method: 'PUT',
          url: API_URL + `books/${id}`,
          data: formdata,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: token
          }
      })
  };
};

export const deleteDataById = (token, id) => {
  return {
      type: 'DELETEDATABYID',
      payload: axios({
          method: 'DELETE',
          url:API_URL + `books/${id}`,
          headers: {
              Authorization: token
          }
      })
  };
};