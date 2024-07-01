import React, { useState } from 'react';
import Header from '../components/Header';
import user from './logo.webp';
import MovieList from '../components/MovieList';
import Dashboard from '../components/Dashboard';
import { Routes, Route, Link } from 'react-router-dom';
import DetailsPage from '../components/DetailsPage';
import SearchMovies from '../components/SearchMovies';
import LoginPage from '../components/LoginPage';
import TvShowsList from '../components/TvShowsList';
import TvDetailsPage from '../components/TvDetailsPage';

const Layout = () => {
  const [isToggled, setIsToggled] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleSidebar = () => {
    setIsToggled(!isToggled);
  };

  const handleDropdownClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <div className={`page-wrapper chiller-theme ${isToggled ? 'toggled' : ''}`}>
      <a id="show-sidebar" className="btn btn-sm btn-dark" href="#" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </a>
      <nav id="sidebar" className="sidebar-wrapper">
        <div className="sidebar-content">
          <div className="sidebar-brand">
            <a href="#">
              <img src={user} alt='logo' />
            </a>
            <div id="close-sidebar" onClick={toggleSidebar}>
              <i className="fas fa-times"></i>
            </div>
          </div>
          <div className="sidebar-menu">
            <ul>
              <li>
                <Link to="/">
                  <i className="fas fa-tachometer-alt"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
              <SidebarDropdown
                title="Movies"
                icon="far fa-gem"
                isActive={activeDropdown === 0}
                onClick={() => handleDropdownClick(0)}
                submenu={[
                  { title: 'Movies', link: '/movies' },
                  { title: 'TV Shows', link: '/tvshows' }, // Placeholder for additional routes
                ]}
              />
              
              {/* <li>
                <Link to="/search">
                  <i className="fas fa-search"></i>
                  <span>Search</span>
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>

      <Header />

      <main className="page-content">
        <div className="page-content-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/search" element={< SearchMovies />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/tvshows" element={<TvShowsList />} />
            <Route path="/movies/details/:id" element={<DetailsPage />} />
            <Route path="/tvshows/details/:id" element={<TvDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const SidebarDropdown = ({ title, icon, badge, badgeClass, isActive, onClick, submenu }) => {
  return (
    <li className={`sidebar-dropdown ${isActive ? 'active' : ''}`}>
      <a href="#" onClick={onClick}>
        <i className={`fa ${icon}`}></i>
        <span>{title}</span>
        {badge && <span className={`badge badge-pill ${badgeClass}`}>{badge}</span>}
      </a>
      <div className={`sidebar-submenu ${isActive ? 'd-block' : 'd-none'}`}>
        <ul>
          {submenu.map((item, index) => (
            <li key={index}>
              <Link to={item.link}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default Layout;
