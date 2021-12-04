import React, { useState, useEffect } from 'react';
import '../styles/addTodo.css';
import { Input, Button, Icon, Message } from 'semantic-ui-react';
import TodoTable from './TodoTable';
import { addTodo, deleteTodo, getAllTodos, marketTodoCompleted } from '../api/todoApi';
import ErrorModel from './ErrorModel';

const AddTodo = () => {
    const [todo, setTodo] = useState('');
    const [reminderDateTime, setReminderDateTime] = useState('');
    const [allTodos, setAllTodos] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openErrorModal, setOpenErrorModel] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAllTodos()
        .then(todos => {
            setLoading(false);
            setAllTodos(todos);
        }).catch(err => {
            setLoading(false);
            setError(err);
        })
    }, [])

    const setError = (errorMsg) => {
        setErrorMessage(errorMsg);
    }

    const handleAddTodo = () => {
        if (todo.length > 0 && reminderDateTime.length > 0) {
            const todoBody = {
                todo,
                reminderDateTime,
                completed: false
            };
            setLoading(true);
            addTodo(todoBody)
            .then((todos) => {
                setLoading(false);
                setAllTodos(todos);
            }).catch(err => {
                setLoading(false);
                setError(err);
            })
        } else {
            handleErrorModal(true);
        }
    }

    const handleDelete = (todoId) => {
        setLoading(true);
        deleteTodo(todoId)
        .then((todos) => {
            setLoading(false);
            setAllTodos(todos);
        }).catch(err => {
            setLoading(false);
            setError(err);
        })
    }

    const handleCompleted = (todoId, checked) => {
        setLoading(true);
        marketTodoCompleted(todoId, !checked)
        .then((todos) => {
            setLoading(false);
            setAllTodos(todos);
        }).catch(err => {
            setLoading(false);
            setError(err);
        })
    }

    const handleErrorModal = (status) => {
        setOpenErrorModel(status)
    }

    return (
        <div className='mainContainer'>
            <ErrorModel open={openErrorModal} setOpen={handleErrorModal}/>
            <div className='justifyCenter' style={{ paddingTop: '20px' }}>
                <Icon name='checkmark box' color='blue' size='big' style={{paddingTop: '10px'}}/>
                <h2 className='todoHeading'>Spike.sh Todo's</h2>
            </div>
            <div className='justifyCenter todoContainer'>
                <Input
                    className='todoInput'
                    placeholder='Add New!'
                    onChange={(event) => {
                        setError(null)
                        setTodo(event.target.value)
                    }}
                    value={todo}
                />
                <input
                    type='datetime-local'
                    className='mediumMarginLeft'
                    onChange={(event) => {
                        setError(null)
                        setReminderDateTime(event.target.value)
                    }}
                    value={reminderDateTime}
                />
                <Button
                    className='mediumMarginLeft'
                    primary
                    size='large'
                    circular 
                    icon='add'
                    onClick={() => {
                        setError(null)
                        handleAddTodo()
                    }}
                />
            </div>
            {errorMessage && <Message error style={{textAlign: 'center'}}>{errorMessage}</Message>}
            <div className='tableContainer justifyCenter'>
                <TodoTable 
                    allTodos={allTodos} 
                    loading={loading}
                    deleteTodo={handleDelete}
                    markCompleted={handleCompleted}
                    />
            </div>
        </div>
    )
}

export default AddTodo;