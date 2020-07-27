import axios from 'axios';
import { API_URL } from '@env';

export const borrowBook = (token, data) =>{
    return {
        type: 'BORROWBOOK',
        payload: axios({
            method: 'POST',
            url: API_URL + `books/borrow`,
            data: {
                title: data.title,
                username: data.username,
            },
            headers: {
              Authorization: token
            }
        })
    };
};

export const returnBook = (token, data) =>{
    return {
        type: 'RETURNBOOK',
        payload: axios({
            method: 'PATCH',
            url: API_URL + 'books/return',
            data: {
              title: data.title,
              username: data.username
            },
            headers: {
              Authorization: token
            }
        })
    };
};

export const getAllHistory = (token, Username) => {
    return {
        type: 'ALLHISTORY',
        payload: axios({
            method: 'GET',
            url: API_URL +`books/history/${Username}`,
            headers: {
                Authorization: token
            }
        })
    };
};