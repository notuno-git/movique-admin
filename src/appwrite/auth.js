import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../appwrite/config';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const checkSession = async () => {
        try {
          await account.get(); // Fetch the current session
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false);
          navigate('/login'); // Redirect to login if no session is found
        } finally {
          setLoading(false);
        }
      };

      checkSession();
    }, [navigate]);

    if (loading) {
      return <div>Loading...</div>; // You can replace this with a spinner or a loading component
    }

    if (!isAuthenticated) {
      return null; // Don't render the component if the user is not authenticated
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
