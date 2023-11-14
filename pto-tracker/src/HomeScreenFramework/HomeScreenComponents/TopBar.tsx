import React, { useState } from "react";
import './TopBar.css'
import ReactDOM from "react-dom";

interface TopBarProps {
    handleLogout:(value: boolean | ((prevVar: boolean) => boolean)) => void;
}


const TopBar: React.FC<TopBarProps> = ({ handleLogout }) => {


    function toggleMenu() {
        document.getElementById("myDropdown")!.classList.toggle("show");
    }

    return (
        
        <div className="dropdown">
            <button onClick={toggleMenu} className="dropbtn"><img src="https://th.bing.com/th/id/OIP.3UkvXbKZ7zex3h7ywCVi6gHaEo?pid=ImgDet&rs=1" className="buttonImage"></img></button>
            <div id="myDropdown" className="dropdown-content">
                <a onClick={e =>{
                    
                }}>Account Settings</a>
                <a onClick={e =>{
                    handleLogout(false);
                }}>logout</a>
            </div>

        </div>
    );
};

export default TopBar;