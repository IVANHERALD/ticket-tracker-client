import React from 'react';
import './styles/Navbar.css'
const Navbar = () => {
  return (
    <div className="home">
      <nav className="navbar">
      <ul className="navbar-nav">
        <br/>
    <li className="nav-item">
    <a href="/" className="nav-link">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-pie-chart"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
        <span className="link-text">Home</span>
      </a>
    </li>
    
    <li className="nav-item">
      <a href="/add" className="nav-link">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        <span className="link-text">Create New Issue</span>
      </a>
    </li>
    
    
  </ul>
</nav>
    </div>
  );
};

export default Navbar;