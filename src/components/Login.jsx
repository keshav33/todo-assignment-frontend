import React from 'react'; 
import { Button, Form, Header, Message } from 'semantic-ui-react'; 
import { useHistory } from 'react-router-dom'; 
import '../styles/login.css';
import { useState } from 'react';
import { loginUser } from '../api/userApi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [authSuccess, setAuthSuccess] = useState(false);
    const history = useHistory();
    const handleLogin = () => {
        setLoading(true);
        loginUser(email, password)
        .then((response) => {
            setError(false);
            setLoading(false);
            setAuthSuccess(true);
            const {accessToken, username, email} = response;
            sessionStorage.setItem('accessToken', accessToken);
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('email', email);
            setTimeout(() => {
                history.push('/todos');
            }, 2000)
        }).catch(err => {
            setLoading(false);
            setError(err);
        })
    }

    return (
        <>
            <div className='loginContainer'>
                <div className='formDiv'>
                    <Header size='medium' className='marginTopSmall' textAlign='center'>Login Using Email ID</Header>
                    {error && <Message error>{error}</Message>}
                    <Form className='loginForm marginTopLarge' size='large'>
                        <Form.Input
                            className='formInput'
                            icon='mail'
                            required
                            name='email'
                            iconPosition='left'
                            value={email}
                            label='Email ID'
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError(null);
                            }}
                            placeholder='abc@email.com' />

                        <Form.Input
                            className='formInput'
                            icon='lock'
                            required
                            iconPosition='left'
                            name='password'
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError(null);
                            }}
                            value={password}
                            label='Password'
                            placeholder='Password'
                            type='password'
                        />
                        <Button
                            className='loginButton'
                            loading={loading}
                            type='Submit'
                            onClick={() => {
                                setError(false)
                                setAuthSuccess(false)
                                handleLogin()
                            }}
                            disabled={loading}
                        >
                            Login
                    </Button>
                    </Form>
                    {authSuccess && <Message success >Authentication Successful</Message>}
                </div>
            </div>
        </>
    )
}

export default Login;
