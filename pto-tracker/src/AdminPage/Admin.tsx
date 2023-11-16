import React, { useState } from "react";
import './Admin.css'
import RegisterNewUser from './AdminComponent/RegisterNewUser'
interface AdminProps {
    handleLogout:() => void;
}


const Admin: React.FC<AdminProps> = ({  }) => {
    const [editRadioButton, setEditRadioButton] = useState(false);
    const [createNewUser, setCreateNewUser] = useState(false);
    const [username, setUsername] = useState("");

    const handleEditRadioButton = () => {
        setEditRadioButton(true);
        setCreateNewUser(false);
    };
    
    const handleCreateNewUser = () => {
        setEditRadioButton(false);
        setCreateNewUser(true);
    };

    const searchBarVisible = () => {
        const searchBar = document.getElementById('searchBar');
        const searchBtn = document.getElementById('userSearchBtn');
        if (editRadioButton==true) {
            searchBar!.style.visibility = 'visible'
            searchBtn!.style.visibility = 'visible'
        } else {
            searchBar!.style.visibility = 'hidden'
            searchBtn!.style.visibility = 'hidden'
        }
    }

    const handleUsername =( tempUsername: React.SetStateAction<string>) =>  {
        setUsername(tempUsername);
      }

    const searchForNewUser = () => {
        if (username=="test") {
            
        }

    }

    return (
        <div id = "AdminPage">
            <form className="AdminForm" action="/action_page.php">
                <h1>Please select an option</h1>
                <label htmlFor="html">Create a New User</label><br></br>
                <input type="radio" id="html" name="fav_language" value="HTML"onClick={ e => {
                    handleEditRadioButton();
                    searchBarVisible();
                }}></input>
                <label htmlFor="css">Edit An Existing User</label>
                <input type="radio" id="EditRadioButton" name="fav_language" value="CSS" onClick={ e => {
                    handleCreateNewUser();
                    searchBarVisible();
                }}></input>
                <p></p>
                <input className="searchUserField" id="searchBar" type="text" placeholder="Search User" onChange={ e => {
                    handleUsername(e.target.value);
                }}></input>
                <button className="userSearchBtn" id="userSearchBtn" type="button" onClick={ e =>{
                      searchForNewUser();
                    }}>Search</button>
            </form>
            <div className="RegisterNewUserDiv">
                <RegisterNewUser></RegisterNewUser>
            </div>
                
            
            
        </div>
    );
};

export default Admin;