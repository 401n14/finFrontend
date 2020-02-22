import React, { useState, useEffect } from "react";
import { NavLink as RouterNavLink, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnchorLink from 'react-anchor-link-smooth-scroll';


import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import Button from './Button';
import { useAuth0 } from "../react-auth0-spa";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [transparent, setTransparent] = useState(window.innerWidth < 768 ? { backgroundColor: `rgba(255,255,255,1)` } : { backgroundColor: `rgba(255,255,255,0)` })
  const [navButtonColor, setNavButtonColor] = useState(window.innerWidth < 768 ? { color: '#0975A7'} : {color: 'white'})
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const toggle = () => setIsOpen(!isOpen);

  useEffect( () => {
    window.addEventListener('scroll', handleScroll);
  }, []);
  //struggling to test this using enzyme
/* istanbul ignore next */
  function handleScroll(e){
    if(window.innerWidth < 768){
      setTransparent({ backgroundColor: `rgba(255,255,255,1)` })
    }else{
      if (window.pageYOffset < 25) {
        setTransparent({ backgroundColor: `rgba(255,255,255,0)` })
        setNavButtonColor({color: 'white'})
      }
      if (window.pageYOffset < 100 && window.pageYOffset > 25) {
        setNavButtonColor({ color: '#0975A7' });
        setTransparent({ backgroundColor: `rgba(255,255,255,0.5)` })
      }
      if(window.pageYOffset > 100) setTransparent({ backgroundColor: `rgba(255,255,255,1)` })
    }

  }

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });

  return (
    <div className="nav-container">
      <Navbar expand="md" style={transparent}>
        <Container>
          <svg
            className="header-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M6 4H5a1 1 0 1 1 0-2h11V1a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V5a1 1 0 0 0-1-1h-7v8l-2-2-2 2V4z" />
          </svg>
          <h1 className="header-text">Transcribe</h1>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="header-nav" navbar>
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/"
                  exact
                  className="header-nav-text"
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <AnchorLink className="header-nav-text special" href="#about">
                  About Us
                </AnchorLink>
              </NavItem>
              {isAuthenticated && (
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    to="/chat"
                    exact
                    className="header-nav-text"
                  >
                    Chat
                  </NavLink>
                </NavItem>
              )}
            </Nav>
            <Nav className="d-none d-md-block" navbar>
              {!isAuthenticated && (
                <NavItem>
                  <Button
                    style={navButtonColor}
                    id="qsLoginBtn"
                    className="btn btn-outline-white btn-small"
                    value="Login"
                    onClick={() => loginWithRedirect({})}
                  />
                </NavItem>
              )}
              {isAuthenticated && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret id="profileDropDown">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile rounded-circle"
                      width="50"
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>{user.name}</DropdownItem>
                    <DropdownItem
                      tag={RouterNavLink}
                      to="/profile"
                      className="dropdown-profile"
                      activeClassName="router-link-exact-active"
                    >
                      <FontAwesomeIcon icon="user" className="mr-3" /> Profile
                    </DropdownItem>
                    <DropdownItem
                      id="qsLogoutBtn"
                      onClick={() => logoutWithRedirect()}
                    >
                      <FontAwesomeIcon icon="power-off" className="mr-3" /> Log
                      out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
            {!isAuthenticated && (
              <Nav className="d-md-none" navbar>
                <NavItem>
                  <Button
                    style={navButtonColor}
                    id="qsLoginBtn"
                    value="Login"
                    className="btn btn-outline-white btn-small"
                    onClick={() => loginWithRedirect({})}
                  />
                </NavItem>
              </Nav>
            )}
            {isAuthenticated && (
              <Nav
                className="d-md-none justify-content-between"
                navbar
                style={{ minHeight: 170 }}
              >
                <NavItem>
                  <span className="user-info">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile d-inline-block rounded-circle mr-3"
                      width="50"
                    />
                    <h6 className="d-inline-block">{user.name}</h6>
                  </span>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="user" className="mr-3" />
                  <RouterNavLink
                    to="/profile"
                    activeClassName="router-link-exact-active"
                  >
                    Profile
                  </RouterNavLink>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="power-off" className="mr-3" />
                  <RouterNavLink
                    to="#"
                    id="qsLogoutBtn"
                    onClick={() => logoutWithRedirect()}
                  >
                    Log out
                  </RouterNavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;