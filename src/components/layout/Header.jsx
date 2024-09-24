import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/AuthContext';
import Accounts from '../../pages/Accounts';
import axios from 'axios';

const Header = () => {

  const isAuthenticated = useContext(AuthContext).isAuthenticated;
  const setIsAuthenticated = useContext(AuthContext).setIsAuthenticated;

  const location = useLocation();

  const handleSignout = async () => {
    const response = await axios.get('/api/members/signout/');
    if (response.data.success) {
        setIsAuthenticated(false);
    }
  }

  return (
    <header className="header tw-h-[10svh] lg:tw-h-[15svh] py-0 tw-w-full tw-content-center">

    <nav className="navbar navbar-expand-md py-0 tw-flex tw-px-[3vw] tw-gap-4">
        <div className='tw-flex tw-grow tw-justify-between tw-items-center'>
          <Link to="/" className="navbar-brand">
            <div>
              <img className='lg:tw-w-[65px] tw-w-[50px]' src="/static/img/logo2.png" alt="Housing Logo" width="65" />
            </div>
          </Link>

          <div className="offcanvas tw-h-full tw-w-full offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby='offcanvasNavbarLabel'>
            <div className='offcanvas-header'>
              <button type='button' className='btn-close' data-bs-dismiss="offcanvas" aria-label='Close'></button>
            </div>
            <div className='offcanvas-body tw-justify-center'>
              <ul className='navbar-nav tw-flex tw-gap-8 max-md:tw-p-8 max-md:tw-text-2xl'>
                <li className="nav-item tw-text-center p-2 active:max-md:tw-outline-1 max-md:tw-outline-0 max-md:tw-outline max-md:tw-outline-neutral-500 max-md:tw-rounded-lg" data-bs-dismiss="offcanvas"><Link to="/home" className="nav-link">Home</Link></li>
                <li className="nav-item tw-text-center p-2 active:max-md:tw-outline-1 max-md:tw-outline-0 max-md:tw-outline max-md:tw-outline-neutral-500 max-md:tw-rounded-lg" data-bs-dismiss="offcanvas"><Link to="/buy" className="nav-link">Buy</Link></li>
                <li className="nav-item tw-text-center p-2 active:max-md:tw-outline-1 max-md:tw-outline-0 max-md:tw-outline max-md:tw-outline-neutral-500 max-md:tw-rounded-lg" data-bs-dismiss="offcanvas">
                  <div data-bs-toggle={isAuthenticated ? '' : 'modal'} data-bs-target='#accounts'><Link to="/sell_home" className="nav-link">Sell</Link></div>
                </li>
                <li className="nav-item tw-text-center p-2 active:max-md:tw-outline-1 max-md:tw-outline-0 max-md:tw-outline max-md:tw-outline-neutral-500 max-md:tw-rounded-lg" data-bs-dismiss="offcanvas"><Link className="nav-link">About</Link></li>
              </ul>
            </div>
          </div>

          {!isAuthenticated ? 
          <div className="nav-item">
            <Link to="/accounts" 
              className='nav-link tw-border tw-border-solid tw-border-slate-300 tw-rounded-lg tw-px-6 tw-cursor-pointer hover:tw-text-white hover:tw-bg-slate-900 tw-py-2' 
              data-bs-toggle='modal' data-bs-target='#accounts'>Signin</Link>
          </div>
          : 
          <div className="nav-item px-2 dropdown">
            <button className='btn text-nowrap nav-link dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
              Accounts
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="appsDropdown">
              {/* <li><Link className="dropdown-item">Profile</Link></li> */}
              {/* <li><Link to="/saved_properties" className="dropdown-item">Saved Properties</Link></li> */}
              <li><Link className="dropdown-item" onClick={handleSignout}>Sign Out</Link></li>
            </ul>
          </div>
          }

        </div>

        <button className="navbar-toggler tw-py-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </nav>

      <div className="modal fade" id="accounts">
        <div className="modal-dialog">
          <div className="modal-content">
            <button type="button" style={{position:'absolute', right:'8px', top:'8px'}} className="btn-close m-0" data-bs-dismiss="modal" aria-label="Close" />
            <Accounts />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;