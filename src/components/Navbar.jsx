import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
    const { pathname } = useLocation();
    const page = pathname.split('/')[1];
    const [isTokenAvailable, setIsTokenAvailable] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const accessToken = sessionStorage.getItem('accessToken');
        const username = sessionStorage.getItem('username');
        if (accessToken) {
            setIsTokenAvailable(true);
            setUsername(username);
        } else {
            setIsTokenAvailable(false);
        }
    }, [page])

    return (
        <ul className='nav'>
            {!isTokenAvailable ?
                <li>
                    <Link className='noHover'>
                        Spike.sh Todo's
                    </Link>
                </li> :
                <li>
                    <Link className='noHover'>
                        {username}
                    </Link>
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
                <li className='nav-item'>
                    <Link to='/logout'>
                        Logout
                    </Link>
                </li>
            }
        </ul>
    )
}

export default Navbar;