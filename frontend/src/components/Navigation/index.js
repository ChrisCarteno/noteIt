// frontend/src/components/Navigation/index.js
import React from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
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
        {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;