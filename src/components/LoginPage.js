import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import { account } from '../appwrite/config';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await account.createSession(email, password);
      console.log('Logged in successfully!');
      toast.success('Logged in successfully!');
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      toast.error('Failed to login: ' + error.message);
      console.error('Failed to login:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="list-heading">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
