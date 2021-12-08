import React from 'react';
import { Button, Form, Header, Message } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import '../styles/login.css';
import { useState } from 'react';
import { loginUser, googleLogin } from '../api/userApi';
import ErrorModel from './ErrorModel';
import GoogleLogin from 'react-google-login';
import { setCookie } from '../utils/cookie'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [authSuccess, setAuthSuccess] = useState(false);
    const [openErrorModal, setOpenErrorModel] = useState(false);
    const history = useHistory();

    const handleLogin = () => {
        if (email.length > 0 && password.length > 0) {
            setLoading(true);
            loginUser(email, password)
                .then((response) => {
                    setError(false);
                    setLoading(false);
                    setAuthSuccess(true);
                    const { accessToken, username, email } = response;
                    setCookie('accessToken', accessToken);
                    setCookie('username', username);
                    setCookie('email', email);
                    setTimeout(() => {
                        history.push('/');
                    }, 2000)
                }).catch(err => {
                    setLoading(false);
                    setError(err);
                })
        } else {
            handleErrorModal(true);
        }
    }

    const handleErrorModal = (status) => {
        setOpenErrorModel(status)
    }

    const responseGoogle = (response) => {
        if (response.error) {
            setError(response.error);
        } else {
            const {email, name} = response.profileObj
            const user = {
                email,
                username: name
            }
            googleLogin(user)
            .then((response) => {
                setError(false);
                setLoading(false);
                setAuthSuccess(true);
                const { accessToken, username, email } = response;
                setCookie('accessToken', accessToken);
                setCookie('username', username);
                setCookie('email', email);
                setTimeout(() => {
                    history.push('/');
                }, 2000)
            }).catch(err => {
                setLoading(false);
                setError(err);
            })
        }
    }

    return (
        <>
            <div className='loginContainer'>
                <ErrorModel open={openErrorModal} setOpen={handleErrorModal} />
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
                                setEmail(e.target.value.toLowerCase());
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
                        <div className='alternateContainer'>
                            <h3>OR</h3>
                        </div>
                        <div className='alternateContainer'>
                            <GoogleLogin
                                className='googleLoginButton'
                                clientId={process.env.REACT_APP_GOOGLE_LOGIN_KEY}
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                    </Form>
                    {authSuccess && <Message success >Authentication Successful</Message>}
                </div>
            </div>
        </>
    )
}

export default Login;
