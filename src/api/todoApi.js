import axios from './axiosConfig';

export const addTodo = (todoBody) => {
    return new Promise((resolve, reject) => {
        axios.post('/todo/addtodo', todoBody)
        .then(() => {
            getAllTodos()
            .then(todos => {
                resolve(todos);
            })
        }).catch(err => {
            reject(err.message);
        })
    })
}

export const getAllTodos = () => {
    return new Promise((resolve, reject) => {
        axios.get('/todo/alltodos')
        .then(response => {
            const todos = response.data
            resolve(todos);
        }).catch(err => {
            reject(err.message);
        })
    })
}

export const deleteTodo = (todoId) => {
    return new Promise((resolve, reject) => {
        axios.delete(`/todo/delete/${todoId}`)
        .then(() => {
            getAllTodos()
            .then(todos => {
                resolve(todos);
            })
        }).catch(err => {
            reject(err.message)
        })
    })
}