import React from "react";
import './RegisterNewUser.css'

interface AdminProps {
    
}


const RegisterNewUser: React.FC<AdminProps> = ({  }) => {
    return (
        <form action="RegisterNewUserForm">
            <div className="container">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <label htmlFor="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" id="email" required></input>
                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" id="psw" required></input>
                <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required></input>
                <button type="submit" className="registerbtn">Register</button>
            </div>
        </form>
    );
};

export default RegisterNewUser;