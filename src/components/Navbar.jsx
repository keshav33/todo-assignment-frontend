import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import '../styles/navbar.css';
import { getCookie, eraseCookie } from '../utils/cookie'

const Navbar = () => {
    const { pathname } = useLocation();
    const page = pathname.split('/')[1];
    const [isTokenAvailable, setIsTokenAvailable] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const accessToken = getCookie('accessToken');
        const username = getCookie('username');
        if (accessToken) {
            setIsTokenAvailable(true);
            setUsername(username);
        } else {
            setIsTokenAvailable(false);
        }
    }, [page])

    const handleLogout = () => {
        eraseCookie('accessToken');
        eraseCookie('username');
        eraseCookie('email');
    }

    return (
        <ul className='nav'>
            {!isTokenAvailable ?
                <li className='nonIntractable'>
                    <Icon name='checkmark box' />
                    Spike.sh Todo's
                </li> :
                <li className='nonIntractable'>
                    <Icon name='user' />
                    {username}
                </li>
            }
            {!isTokenAvailable &&
                <li className='nav-item'>
                    <Link to='/login'>
                        Login
                    </Link>
                </li>
            }
            {!isTokenAvailable &&
                <li className='nav-item'>
                    <Link to='/signup'>SignUp
                    </Link>
                </li>
            }
            {isTokenAvailable &&
                <li className='nav-item' onClick={() => handleLogout()}>
                    <Link to='/logout'>
                        Logout
                    </Link>
                </li>
            }
        </ul>
    )
}

export default Navbar;