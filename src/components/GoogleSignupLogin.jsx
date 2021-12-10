import React from "react";
import GoogleLogin from 'react-google-login';
import { setCookie } from '../utils/cookie';
import { useHistory } from 'react-router-dom';
import { googleLogin } from '../api/userApi';

const GoogleSignupLogin = (props) => {
    const history = useHistory();
    const responseGoogle = (response) => {
        if (response.error) {
            props.setError(response.error);
        } else {
            const { email, name } = response.profileObj
            const user = {
                email,
                username: name
            }
            googleLogin(user)
                .then((response) => {
                    props.setError(false);
                    props.setLoading(false);
                    props.setAuthSuccess(true);
                    const { accessToken, username, email } = response;
                    setCookie('accessToken', accessToken);
                    setCookie('username', username);
                    setCookie('email', email);
                    setTimeout(() => {
                        history.push('/');
                    }, 2000)
                }).catch(err => {
                    props.setLoading(false);
                    props.setError(err);
                })
        }
    }
    return (
        <GoogleLogin
            className='googleLoginButton'
            clientId={process.env.REACT_APP_GOOGLE_LOGIN_KEY}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            buttonText={props.buttonText}
        />
    )
}

export default GoogleSignupLogin;