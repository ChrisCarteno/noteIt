// frontend/src/components/Navigation/index.js
import React from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <ProfileButton className="profile" user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
      </>
    );
  }

  return (
    <div className="navigation">
        <NavLink 
        style={({ isActive }) => ({
          color: isActive ? '#fff' : '#545e6f',
          background: isActive ? '#7600dc' : '#f0f0f0',
        })}
        className="navLink" exact to="/">Home</NavLink>
        
        {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;