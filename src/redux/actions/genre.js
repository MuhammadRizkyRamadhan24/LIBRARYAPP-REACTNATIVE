import axios from 'axios';
import { API_URL } from '@env';

export const getAllGenre = (token) => {
    return {
        type: 'ALLGENRE',
        payload: axios({
            method : "GET",
            url : API_URL + 'genres',
            headers : {
              Authorization : token
            }
          })
    };
};