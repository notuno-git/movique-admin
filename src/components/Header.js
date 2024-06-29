import React from 'react'
import logo from '../layout/logo.webp'

const Header = () => {
    return (
        <div className="header-top">
            <div className='header-logo ml-3'>
                <img src={logo} alt='logo' />
            </div>
            <div className="dropdown">
                <button className="user dropdown-toggle" type="button" id="userDrop" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className='user-icon'><i className="fas fa-user-alt"></i></div>
                    Admin
                </button>
                <ul className="dropdown-menu" aria-labelledby="userDrop">
                    <li><a className="dropdown-item" href="#">Logout</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Header
