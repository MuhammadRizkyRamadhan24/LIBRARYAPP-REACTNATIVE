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

export const getSearch = (token, search, order, sort, limit, page) =>{
  return {
      type: 'SEARCH',
      payload:  axios({
               method: 'GET',
               url: `http://localhost:3000/books/search?search=${search}&order=${order}&sort=${sort}&limit=${limit}&page=${page}`,
               headers: {
                   Authorization: token
               }
           })
  };
};

export const addBook = (token, formData) =>{
  return {
      type: 'ADDBOOK',
      payload: axios({
          method: 'POST',
          url: 'http://localhost:3000/books',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token
          }
      })
  };
};

export const editBook = (token, formData, id) =>{
  return {
      type: 'EDITBOOK',
      payload: axios({
          method: 'PUT',
          url: `http://localhost:3000/books/${id}`,
          data: formData,
          headers: {
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
          url:`http://localhost:3000/books/${id}`,
          headers: {
              Authorization: token
          }
      })
  };
};