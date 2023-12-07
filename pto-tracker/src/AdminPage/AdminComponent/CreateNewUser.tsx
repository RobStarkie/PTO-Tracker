import React, { useState } from "react";
import './CreateNewUser.css'
import shapes from './shapes.svg';
import axios from 'axios';

interface AdminProps {
    getToken: () => string;
}

const CreateNewUser: React.FC<AdminProps> = ({getToken}) => {
    const token : string = getToken();
    
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [lineManagerID, setLineManagerID] = useState("");
    const [holidayNumber, setHolidayNumber] = useState("");
    const [lineManagerBool, setLineManagerBool] = useState(false);
    const [adminBool, setAdminBool] = useState(false);
    const [teamNumber, setTeamNumber] = useState("");
    const [ProfilePicture, setProfilePicture] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const submitUser = async () => {
        if (password1==password2) {
            const postData = {
                'userID' : username,
                'TeamID' : teamNumber,
                'Email' : email,
                'FirstName' : firstName,
                'SecondName' : secondName,
                'Password' : password1,
                'ProfilePicture' : ProfilePicture,
                'PhoneNumber' : phoneNumber,
                'LineManager' : lineManagerBool,
                'LineManagerID' : lineManagerID,
                'TotalHolidays' : holidayNumber,
                'Admin' : adminBool
            }
            axios.post('http://localhost:5000/addNewUser', postData, { headers: { Authorization: `Bearer ${token}` }})
            .then(response => {
                console.log("has user been added : " + response.data)
                
              })
            .catch(error => {
                console.error('Error:', error);
            }); 
        }
    }
    
    return (
        <div className="CreateNewUser">
            <h1 className="RegisterNewUserFormHeader">Create New Account</h1>
            <div className="userInputs1">
                <label htmlFor="username">UserID</label>
                <input type="text" placeholder="username" name="username" id="username" required onChange={e =>{setUsername(e.target.value);}} ></input>

                <label htmlFor="firstName">First Name</label>
                <input type="text" placeholder="firstName" name="firstName" id="username" required onChange={e =>{setFirstName(e.target.value);}}></input>

                <label htmlFor="username">Last Name</label>
                <input type="text" placeholder="lastName" name="lastName" id="lastName" required onChange={e =>{setSecondName(e.target.value);}}></input> 

                <label htmlFor="email">Email</label>
                <input type="text" placeholder="Enter Email" name="email" id="email" required onChange={e =>{setEmail(e.target.value);}}></input>

                <label htmlFor="email">Phone Number</label>
                <input type="text" placeholder="PhoneNumber" name="PhoneNumber" id="PhoneNumber" required onChange={e =>{setPhoneNumber(e.target.value);}}></input>
            </div>
            <div className="userInputs2">
           
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Enter Password" name="password" id="password" required onChange={e =>{setPassword1(e.target.value);}}></input>

                <label htmlFor="repeatPassword">Repeat Password</label>
                <input type="password" placeholder="Enter Password" name="repeatPassword" id="repeatPassword" required onChange={e =>{setPassword2(e.target.value);}}></input>

                <label htmlFor="LineManagerLabel" >Line Manager</label>
                <input type="text" placeholder="Line Manager" name="LineManagerInput" id="LineManagerInput" required onChange={e =>{setLineManagerID(e.target.value);}}></input>

                <label htmlFor="HolidayNumber" > Number of Holidays</label>
                <input type="text" placeholder="Number of Holidays" name="numberOfHolidays" id="numberOfHolidays" required onChange={e =>{setHolidayNumber(e.target.value);}}></input>
                
            </div>
            <div className="userInputs3">
                <label htmlFor="lineManagerBtn" >Line Manager:</label>
                <input type="radio" id="CreateUserBtn" name="typeOfAccount" value="createLineManager" onClick={ e => {setLineManagerBool(true)}}></input>

                <label htmlFor = "adminLable" >Admin Account</label>
                <input type="radio" id="createAdmin" name="typeOfAccount" value="createAdmin" onClick={ e => {setAdminBool(true)}}></input>

                <label htmlFor="numberOfHoliday" >Team Number</label>
                <input type="text" placeholder="Number of Holidays" name="teamNumber" id="teamNumber" required onChange={e =>{setTeamNumber(e.target.value);}}></input>

                <label htmlFor="numberOfHoliday" >Profile Picture</label>
                <input type="text" placeholder="Profile Picture URL" name="profilePicture" id="profilePicture" required onChange={e =>{setProfilePicture(e.target.value);}}></input>

            </div>
            <div>
                <button type="submit" className="registerbtn" onClick={submitUser}>Register</button>
            </div>
        
        </div>
        
        
    );
};

export default CreateNewUser;
