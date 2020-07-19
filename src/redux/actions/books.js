import axios from 'axios';
import { API_URL } from '@env';
export const newArrivals = (token) => {
  return {
    type: 'NEWARRIVALS',
    payload: axios({
      method: 'GET',
      url: API_URL + `books/search?search=&order=added_at&sort=desc&limit=4&page=1`,
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
        url: API_URL + `books/search?search=&order=added_at&sort=asc&limit=4&page=1`,
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