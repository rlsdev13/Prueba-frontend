import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

import { startLogout } from '../../actions/auth';

export const Navbar = () => {
    const google = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    
    const { name } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // const { name } = useSelector(state => state.auth);
        
    const handleLogout = () => {
        dispatch( startLogout() );
    }
    
    const handleSidebar = (e) => {
        e.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
    }

    return (
    <>
        <nav className="navbar navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">{ name }</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li className="nav-item">
                            <a className="nav-link " aria-current="page" href="#">Google Calendar</a>
                        </li>
                        <hr />
                        <NavLink
                            activeClassName="active"
                            className="nav-link"
                            exact
                            to="/textField"
                        >
                            Text Field
                        </NavLink>
                        
                        <hr />
                        <NavLink
                            activeClassName="active"
                            className="nav-link"
                            exact
                            to="/crypto"
                        >
                            Cryptos
                        </NavLink>
                        <hr />
                        <li className="nav-item">
                        <GoogleLogout
                            clientId={google}
                            buttonText="Logout"
                            onLogoutSuccess={handleLogout}
                        >
                        </GoogleLogout>
                        </li>
                    </ul>
                </div>
                </div>
            </div>
        </nav>
    </>
  );
}