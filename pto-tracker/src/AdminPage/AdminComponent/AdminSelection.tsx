import { useState } from "react";
import './AdminSelection.css';
import { create } from "domain";

interface AdminSelectionProps {
    handleCreateAccount: () => void;
    handleEditAccount: () => void;
    handleUsername: (value: string | ((prevVar: string) => string)) => void;
}

const AdminSelction: React.FC<AdminSelectionProps> = ({ handleCreateAccount, handleEditAccount, handleUsername }) => {
    const [editRadioButton, setEditRadioButton] = useState(false);
    const [createNewUser, setCreateNewUser] = useState(true);
    const [username, setUsername] = useState("");
    const searchBar = document.getElementById('searchBar');
    const searchBtn = document.getElementById('userSearchBtn');


    const handleEditRadioButton = () => {
        setEditRadioButton(true);
        setCreateNewUser(false);
        handleEditAccount();
        setUsername('');           
        searchBar!.style.visibility = 'visible';
        searchBtn!.style.visibility = 'visible';
    };
    
    const handleCreateNewUser = () => {
        setEditRadioButton(false);
        setCreateNewUser(true);
        handleCreateAccount();
        setUsername(''); 
        searchBar!.style.visibility = 'hidden';
        searchBtn!.style.visibility = 'hidden';
    };    

    const handleUsernameInput = (tempUsername: string) => {
        setUsername(tempUsername);
    }

    const searchUser = () => {
        if (username =='temp') {
            handleUsername(username);
        } else {
            alert("ALERT!\nUSER '"+username+"' DOES NOT EXIST");
            handleUsername("");
        }
    }

    return (
        <div className="AdminSelection">         
            <h1>Please select an option</h1>
            <label htmlFor="CreateUser">Create a New Account</label><br></br>
            <input defaultChecked type="radio" id="CreateUserBtn" name="optionSelection" value="CreateUser" onClick={ e => {
                handleCreateNewUser();
                
            }}></input>
            <label htmlFor="editUSers">Edit An Existing User</label>
            <input type="radio" id="EditRadioButton" name="optionSelection" value="editUSers" onClick={ e => {
                handleEditRadioButton();
                
            }}></input>
            <p></p>
            <input className="searchUserField" id="searchBar" type="text" placeholder="Search User"  onChange={ e => {
                handleUsernameInput(e.target.value);
            }}value={username}></input>
            <button className="userSearchBtn" id="userSearchBtn" type="button" onClick={ e =>{
                searchUser();
            }}>Search</button>
        </div>
    );
    
};
export default AdminSelction;