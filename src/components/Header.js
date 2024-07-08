// import React from 'react'
// import logo from '../layout/logo.webp'

// const Header = () => {
//     return (
//         <div className="header-top">
//             <div className='header-logo ml-3'>
//                 <img src={logo} alt='logo' />
//             </div>
//             <div className="dropdown">
//                 <button className="user dropdown-toggle" type="button" id="userDrop" data-bs-toggle="dropdown" aria-expanded="false">
//                     <div className='user-icon'><i className="fas fa-user-alt"></i></div>
//                     Admin
//                 </button>
//                 <ul className="dropdown-menu" aria-labelledby="userDrop">
//                     <li><a className="dropdown-item" href="#">Logout</a></li>
                    
//                 </ul>
//             </div>
//         </div>
//     )
// }

// export default Header


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../appwrite/config';
import { toast } from 'react-toastify';
import logo from '../layout/logo.webp';

const Header = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUserName(user.name || 'Admin'); // Display the user's name, fallback to 'Admin' if not available
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout: ' + error.message);
    }
  };

  return (
    <div className="header-top">
      <div className='header-logo ml-3'>
        <img src={logo} alt='logo' />
      </div>
      <div className="dropdown">
        <button className="user dropdown-toggle" type="button" id="userDrop" data-bs-toggle="dropdown" aria-expanded="false">
          <div className='user-icon'><i className="fas fa-user-alt"></i></div>
          {userName}
        </button>
        <ul className="dropdown-menu" aria-labelledby="userDrop">
          <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
