import axios from 'axios';
import { API_URL } from '@env';

export const getAllAuthor = (token) => {
    return {
        type: 'ALLAUTHOR',
        payload: axios({
            method : "GET",
            url : API_URL + 'authors',
            headers : {
              Authorization : token
            }
          })
    };
};