import axios from './axiosConfig';
import { formatError } from '../utils/formatErrors';

export const signupUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        axios.post('/user/signup', {username, email, password})
        .then(() => {
            resolve();
        }).catch(err => {
            reject(formatError(err));
        })
    })
}

export const loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
        axios.post('/user/login', {email, password})
        .then((response) => {
            resolve(response.data);
        }).catch(err => {
            reject(formatError(err));
        })
    })
}

export const googleLogin = (user) => {
    return new Promise((resolve, reject) => {
        axios.post('/user/google/login', {user})
        .then((response) => {
            resolve(response.data);
        }).catch(err => {
            reject(formatError(err));
        })
    })
}