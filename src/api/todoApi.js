import axios from './axiosConfig';
import { formatError } from '../utils/formatErrors';
import { getCookie } from '../utils/cookie';

export const addTodo = (todoBody) => {
    return new Promise((resolve, reject) => {
        const token = getCookie('accessToken');
        axios.post('/todo/addtodo', todoBody, {headers: { 'Authorization': `Bearer ${token}`} })
        .then(() => {
            getAllTodos()
            .then(todos => {
                resolve(todos);
            })
        }).catch(err => {
            reject(formatError(err));
        })
    })
}

export const getAllTodos = () => {
    return new Promise((resolve, reject) => {
        const token = getCookie('accessToken');
        axios.get('/todo/alltodos', {headers: { Authorization: `Bearer ${token}`} })
        .then(response => {
            const todos = response.data.userTodos;
            resolve(todos);
        }).catch(err => {
            reject(formatError(err));
        })
    })
}

export const deleteTodo = (todoId) => {
    return new Promise((resolve, reject) => {
        const token = getCookie('accessToken');
        axios.delete(`/todo/delete/${todoId}`, {headers: { Authorization: `Bearer ${token}`} })
        .then(() => {
            getAllTodos()
            .then(todos => {
                resolve(todos);
            })
        }).catch(err => {
            reject(formatError(err))
        })
    })
}

export const marketTodoCompleted = (todoId, checked) => {
    return new Promise((resolve, reject) => {
        const token = getCookie('accessToken');
        axios.put('/todo/setcompleted', {id: todoId, checked}, {headers: { Authorization: `Bearer ${token}`} })
        .then(() => {
            getAllTodos()
            .then(todos => {
                resolve(todos);
            })
        }).catch(err => {
            reject(formatError(err))
        })
    })
}