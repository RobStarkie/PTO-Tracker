import { useState } from "react";
import './AdminSelection.css';
import { create } from "domain";
import axios from 'axios';

interface AdminSelectionProps {
    handleCreateAccount: () => void;
    handleEditAccount: () => void;
    handleUser: (user: {userID: string, TeamID: string, Email: string, FirstName: string, SecondName: string, password: string, ProfilePicture:string, phoneNumber:string, LineManager: boolean, LineManagerID: string, TotalHolidays: string, Admin: boolean}) => void;
    getToken: () => string;
}

const AdminSelction: React.FC<AdminSelectionProps> = ({ handleCreateAccount, handleEditAccount, handleUser, getToken}) => {
    const [editRadioButton, setEditRadioButton] = useState(false);
    const [createNewUser, setCreateNewUser] = useState(true);
    const [username, setUsername] = useState("");
    const token : string = getToken();
    const handleEditRadioButton = () => {
        setEditRadioButton(true);
        setCreateNewUser(false);
        handleEditAccount();
        searchVisible();
        
    };

    const searchVisible = () => {
        const searchBar = document.getElementById('searchBar');
        const searchBtn = document.getElementById('userSearchBtn');
        if (editRadioButton==false) {
            setUsername('');           
            searchBar!.style.visibility = 'visible';
            searchBtn!.style.visibility = 'visible';
        } else {
            setUsername(''); 
            searchBar!.style.visibility = 'hidden';
            searchBtn!.style.visibility = 'hidden';
        }
    }
    
    const handleCreateNewUser = () => {
        setEditRadioButton(false);
        setCreateNewUser(true);
        handleCreateAccount();
        searchVisible();
 
    };    

    const handleUsernameInput = (tempUsername: string) => {
        setUsername(tempUsername);
    }

    const searchUser = () => {
        const postData = {
            'userID': username
        }
        axios.post('http://localhost:5000/api/secured/getUser',postData,{headers: { Authorization: token }})
        .then(response => {
            const user = {
                userID: response.data['UserID'], 
                TeamID: response.data['TeamID'], 
                Email: response.data['Email'], 
                FirstName: response.data['FirstName'],
                SecondName: response.data['SecondName'], 
                password: response.data['password'], 
                ProfilePicture:response.data['ProfilePicture'], 
                phoneNumber:response.data['phoneNumber'], 
                LineManager: response.data['LineManager'], 
                LineManagerID: response.data['LineManagerID'], 
                TotalHolidays: response.data['TotalHolidays'], 
                Admin: response.data['Admin']
            } 
            handleUser(user)
        })
        .catch(TypeError => {
            console.error('Error:', TypeError);
        });
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