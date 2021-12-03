import React from 'react'; 
import { Button, Form, Header, Message } from 'semantic-ui-react'; 
// import { useHistory } from 'react-router-dom'; 
import '../styles/login.css';
import { useState } from 'react';
import { signupUser } from '../api/userApi';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false)

    const handleSignup = () => {
        setLoading(true);
        signupUser(username, email, password)
        .then(() => {
            setError(false);
            setLoading(false);
            setSignupSuccess(true);
        }).catch(err => {
            setLoading(false);
            setError(err);
        })
    }

    return (
        <>
            <div className='loginContainer'>
                <div className='formDiv'>
                    <Header size='medium' className='marginTopSmall' textAlign='center'>Please Sign Up</Header>
                    {error && <Message error>{error}</Message>}
                    <Form className='loginForm marginTopLarge' size='large'>
                        <Form.Input
                            className='formInput'
                            icon='user outline'
                            required
                            name='username'
                            iconPosition='left'
                            value={username}
                            label='Username'
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setError(null);
                            }}
                            placeholder='abc123' />

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
                                setSignupSuccess(false)
                                setError(false)
                                handleSignup()
                            }}
                            disabled={loading}
                        >
                            Login
                    </Button>
                    </Form>
                    {signupSuccess && <Message success >You Are Successfully Signed Up!</Message>}
                </div>
            </div>
        </>
    )
}

export default SignUp;