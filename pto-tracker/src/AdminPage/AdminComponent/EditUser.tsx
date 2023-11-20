import React from "react";
import './EditUser.css'

interface AdminProps {
    username:string;
}

const EditUser: React.FC<AdminProps> = ({username}) => {

    return (
        <div className="CreateNewUser">
            <h1 className="RegisterNewUserFormHeader">Edit user: {username}</h1>
            <div className="userInputs1">

                <label htmlFor="username">Username</label>
                <input type="text" placeholder="username" name="username" id="username" value={username} required></input>

                <label htmlFor="username">First Name</label>
                <input type="text" placeholder="firstName" name="firstName" id="firstName" required></input>

                <label htmlFor="username">Last Name</label>
                <input type="text" placeholder="lastName" name="lastName" id="lastName" required></input> 

                <label htmlFor="email">Email</label>
                <input type="text" placeholder="Enter Email" name="email" id="email" required></input>
            </div>
            <div className="userInputs2">
           
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Enter Password" name="password" id="password" required></input>

                <label htmlFor="repeatPassword">Repeat Password</label>
                <input type="password" placeholder="Enter Password" name="repeatPassword" id="repeatPassword" required></input>

                <label htmlFor="LineManagerLabel" >Line Manager</label>
                <input type="text" placeholder="Line Manager" name="LineManagerInput" id="LineManagerInput" required></input>

                <label htmlFor="LineManagerLabel" > Number of Holidays</label>
                <input type="text" placeholder="Number of Holidays" name="LineManagerInput" id="LineManagerInput" required></input>
                
            </div>
            <div className="userInputs3">
                <label htmlFor="username" >Line Manager:</label>
                <input type="radio" id="CreateUserBtn" name="typeOfAccount" value="CreateUser" onClick={ e => {}}></input>

                <label htmlFor = "adminLable" >Admin Account</label>
                <input type="radio" id="createAdmin" name="typeOfAccount" value="createAdmin" onClick={ e => {}}></input>

            </div>
            <div>
                <button type="submit" className="registerbtn">Register</button>
            </div>
        
        </div>
    );
};

export default EditUser;