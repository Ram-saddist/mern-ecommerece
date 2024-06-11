import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';

const Navbar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole'); // Add this line to get user role
  console.log("userId and userrole",userId,userRole)

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole'); // Remove userRole from localStorage
    navigate('/');
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {userId ? (
        <>
          {userRole === 'admin' && <Link to="/addproduct">Add Product</Link>}
          <Link to="/cart">Cart</Link>
          <Link onClick={handleLogout}>Logout</Link>
        </>
      ) : (
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
