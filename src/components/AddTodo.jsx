import React, { useState, useEffect } from 'react';
import '../styles/addTodo.css';
import { Input, Button, Icon } from 'semantic-ui-react';
import TodoTable from './TodoTable';
import { addTodo, deleteTodo, getAllTodos, ç } from '../api/todoApi'

const AddTodo = () => {
    const [todo, setTodo] = useState('');
    const [reminderDateTime, setReminderDateTime] = useState('');
    const [allTodos, setAllTodos] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

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
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
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
            alert('Please Enter Correct Values');
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
    
    return (
        <div className='mainContainer'>
            <div className='justifyCenter' style={{ paddingTop: '20px' }}>
                <Icon name='checkmark box' color='blue' size='big' style={{paddingTop: '10px'}}/>
                <h2 className='todoHeading'>Spike.sh TODO</h2>
            </div>
            <div className='justifyCenter todoContainer'>
                <Input
                    className='todoInput'
                    placeholder='Add New!'
                    onChange={(event) => setTodo(event.target.value)}
                    value={todo}
                />
                <input
                    type='datetime-local'
                    className='mediumMarginLeft'
                    onChange={(event) => setReminderDateTime(event.target.value)}
                    value={reminderDateTime}
                />
                <Button
                    className='mediumMarginLeft'
                    primary
                    size='large'
                    circular 
                    icon='add'
                    onClick={() => handleAddTodo()}
                />
            </div>
            {errorMessage && <div className='justifyCenter errorMessage'>{errorMessage}</div>}
            <div className='tableContainer justifyCenter'>
                <TodoTable 
                    allTodos={allTodos} 
                    loading={loading}
                    deleteTodo={handleDelete}
                    />
            </div>
        </div>
    )
}

export default AddTodo;