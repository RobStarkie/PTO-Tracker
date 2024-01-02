import React, { useState, useEffect } from "react";
import './EditUser.css'
import axios from 'axios';

interface AdminProps {
    user: {userID: string, TeamID: string, Email: string, FirstName: string, SecondName: string, password: string, ProfilePicture:string, phoneNumber:string, LineManager: boolean, LineManagerID: string, TotalHolidays: string, Admin: boolean}
    getToken: () => string;
}

const EditUser: React.FC<AdminProps> = ({user, getToken}) => {

    useEffect (() => {
        setUsername(user.userID)
        setFirstName(user.FirstName)
        setSecondName(user.SecondName)
        setEmail(user.Email)
        setPassword1(user.password)
        setPassword2(user.password)
        setLineManagerID(user.LineManagerID)
        setHolidayNumber(user.TotalHolidays)
        setLineManagerBool(user.LineManager)
        setAdminBool(user.Admin)
        setTeamNumber(user.TeamID)
        setProfilePicture(user.ProfilePicture)
        setPhoneNumber(user.phoneNumber)

    }, [user])

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
            axios.post('http://localhost:5000/editUser', postData, { headers: { Authorization: `Bearer ${token}` }})
            .then(response => {
                console.log("has user been added : " + response.data)
                
              })
            .catch(error => {
                console.error('Error:', error);
            }); 
        }
    }
    
    return (
        <div className="EditAccount">
            <h1 className="RegisterNewUserFormHeader">Edit Account</h1>
            <div className="userInputs1">
                <label htmlFor="username">UserID</label>
                <input type="text" value = {username} placeholder="username" name="username" id="username" required onChange={e =>{setUsername(e.target.value);}} ></input>

                <label htmlFor="firstName">First Name</label>
                <input type="text" value = {firstName}placeholder="firstName" name="firstName" id="username" required onChange={e =>{setFirstName(e.target.value);}}></input>

                <label htmlFor="lastName">Last Name</label>
                <input type="text" value = {secondName} placeholder="lastName" name="lastName" id="lastName" required onChange={e =>{setSecondName(e.target.value);}}></input> 

                <label htmlFor="email">Email</label>
                <input type="text" value={email} placeholder="Enter Email" name="email" id="email" required onChange={e =>{setEmail(e.target.value);}}></input>

                <label htmlFor="email">Phone Number</label>
                <input type="text" value ={phoneNumber} placeholder="PhoneNumber" name="PhoneNumber" id="PhoneNumber" required onChange={e =>{setPhoneNumber(e.target.value);}}></input>
            </div>
            <div className="userInputs2">
           
                <label htmlFor="password">Password</label>
                <input type="password" value={password1} placeholder="Enter Password" name="password" id="password" required onChange={e =>{setPassword1(e.target.value);}}></input>

                <label htmlFor="repeatPassword">Repeat Password</label>
                <input type="password" value={password2} placeholder="Enter Password" name="repeatPassword" id="repeatPassword" required onChange={e =>{setPassword2(e.target.value);}}></input>

                <label htmlFor="LineManagerLabel" >Line Manager</label>
                <input type="text" value={lineManagerID} placeholder="Line Manager" name="LineManagerInput" id="LineManagerInput" required onChange={e =>{setLineManagerID(e.target.value);}}></input>

                <label htmlFor="HolidayNumber" > Number of Holidays</label>
                <input type="text" value={holidayNumber} placeholder="Number of Holidays" name="numberOfHolidays" id="numberOfHolidays" required onChange={e =>{setHolidayNumber(e.target.value);}}></input>
                
            </div>
            <div className="userInputs3">
                <label htmlFor="lineManagerBtn" >Line Manager:</label>
                <input type="radio" checked={lineManagerBool==true} id="createLineManager" name="typeOfAccount" value="createLineManager" onClick={ e => {setLineManagerBool(true)}}></input>

                <label htmlFor = "adminLable" >Admin Account</label>
                <input type="radio" checked={lineManagerBool==true} id="createAdmin" name="typeOfAccount" value="createAdmin" onClick={ e => {setAdminBool(true)}}></input>

                <label htmlFor="numberOfHoliday" >Team Number</label>
                <input type="text" value={teamNumber} placeholder="Number of Holidays" name="teamNumber" id="teamNumber" required onChange={e =>{setTeamNumber(e.target.value);}}></input>

                <label htmlFor="numberOfHoliday" >Profile Picture</label>
                <input type="text" value={ProfilePicture} placeholder="Profile Picture URL" name="profilePicture" id="profilePicture" required onChange={e =>{setProfilePicture(e.target.value);}}></input>

            </div>
            <div>
                <button type="submit" className="registerbtn" onClick={submitUser}>Register</button>
            </div>
        </div>
    );
};

export default EditUser;