import { Outlet, Link } from "react-router-dom";
import React, { useState } from "react";
import './Layout.css'
import ReactDOM from "react-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from './logo.svg';
import Admin from "./AdminPage/Admin";

interface TopBarProps {
    handleLogout:() => void;
    admin: boolean;
}


const Layout: React.FC<TopBarProps> = ({ handleLogout, admin }) => {
  

  const handleLogoutClick = () => {
    handleLogout();
  };


  return (
    <div>
      {admin ? ( 
        <div className="topbar">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
          <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
              <Link to="/" style={{ textDecoration: 'none' }}><Navbar.Brand><img src={logo}></img>RTX PTO</Navbar.Brand></Link>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                </Nav>
                <Nav>
                  <Nav.Link as={Link} to="/account">Account Settings</Nav.Link>
                  <Nav.Link onClick={handleLogoutClick}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <div style={{color:'red', display: 'inline-block',}}>Sign Out</div>
                      <span className="material-symbols-outlined" style={{ display: 'inline-block', color:'red'}}>logout</span>
                    </div>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      ) : (
        <div className="topbar">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
          <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
              <Link to="/" style={{ textDecoration: 'none' }}><Navbar.Brand><img src={logo}></img>RTX PTO</Navbar.Brand></Link>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                </Nav>
                <Nav style={{marginTop:'12px'}}>
                <Nav.Link as={Link} to="/team-view"><p>Team Overview</p></Nav.Link>
                    <Nav.Link as={Link} to="/account" style={{marginTop:'-2px'}}>Logged In: <b>Matt Connolly</b> <img style={{borderRadius:'100%', width:'30px', alignItems:'center'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRudDbHeW2OobhX8E9fAY-ctpUAHeTNWfaqJA&s"></img></Nav.Link>
                    <Nav.Link onClick={handleLogoutClick}>
                      <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <div style={{color:'red', display: 'inline-block',}}></div>
                        <span className="material-symbols-outlined" style={{ display: 'inline-block', color:'red'}}>logout</span>
                      </div>
                    </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      )}
    <Outlet />
    <p style={{position:'fixed', bottom:0, left:'50%', zIndex:-1, display:'none'}}>Raytheon PTO Tracker App ©2023</p>
    </div>
  )
}

export default Layout;