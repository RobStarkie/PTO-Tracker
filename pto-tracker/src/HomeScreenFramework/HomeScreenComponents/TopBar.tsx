import React, { useState } from "react";
import './TopBar.css'
import ReactDOM from "react-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../logo.svg';

interface TopBarProps {
    handleLogout:() => void;
}




const TopBar: React.FC<TopBarProps> = ({ handleLogout }) => {

  const handleLogoutClick = () => {
    handleLogout();
  };

    return (
      <div className="topbar">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home"><img src={logo}></img>RTX PTO</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Team Overview</Nav.Link>
            <Nav.Link href="#deets">Account Settings</Nav.Link>
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
    );
};

export default TopBar;