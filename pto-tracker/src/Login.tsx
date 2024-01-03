import React, { useState } from 'react';
import './Login.css';
import logo from './logo.png'
import SmallLoadingSpinner from './Components/SmallLoadingSpinner';
import axios, { AxiosRequestHeaders } from 'axios';



// Define the props interface if needed
interface LoginScreenProps {
    handleLogin: () => void;
    handleUsername: (value: string | ((prevVar: string) => string)) => void;
    handleAdmin: () => void;
    handleToken: (value: string | ((prevVar: string) => string)) => void;
}

// Functional component
const LoginScreen: React.FC<LoginScreenProps> = ({ handleLogin, handleUsername, handleAdmin, handleToken }) => {

  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(true);
  const [emailSent, setEmailSent] = useState(true);
  const [loginPressed, setLoginPressed] = useState(false);

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(false);
  };

  const setEmailSentClick = async () => {
    setEmailSent(false);
    const postData = {
      "email": username
    }
    axios.post('http://localhost:5000/api/forgottenPassword', postData)
    .then(response => { 
      console.log(response)
    })
    .catch(error => {
      console.error('Error:', error);
      setLoginPressed(false);
    });

    setEmailSent(true);
    setShowForgotPassword(true);
  };

  const handleLoginClick = async () => {
    setLoginPressed(true);
    const postData = {
      "email" : (username),
      "password" : (password)
    }

    axios.post('http://localhost:5000/api/token', postData)
    .then(response => {
      localStorage.setItem('token', response.data["token"]);
      handleGeneratedToken(response.data["token"]);
      const token = localStorage.getItem('token')
      console.log("Login, print out token after storage: ", token)
      handleGeneratedToken(response.data["token"]);
      handleLogin();
      if (response.data["admin"]==true) {
        handleAdmin();
      }
      
      setLoginPressed(false);
    })
    .catch(error => {
      console.error('Error:', error);
      setLoginPressed(false);
    });    
  };

  const sendPasswordReset = () => {
    setEmailSentClick();
  };

  const handleGeneratedToken = (tempToken: string) => {
    handleToken(tempToken);
  }

  const handleUsernameInput = (tempUsername: string) => {
    handleUsername(tempUsername);
  }



  return (
    <body>
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <form>
            <h3>Welcome</h3>
            <img src={logo} className='logo'></img>
            {emailSent &&(
              <div style={{textAlign:'start'}}>
              <label htmlFor="username">Email Address</label>
              <input className="animated-border" type="text" disabled={loginPressed} placeholder="Email" id="username" required onChange={e =>{
                  setUsername(e.target.value);
                  handleUsernameInput(e.target.value);
                  e.preventDefault();
                }} />

              {!showForgotPassword && (
                <div>
                  <button onClick={sendPasswordReset}>Send Reset Link</button>
                </div>
              )}

              {showForgotPassword && (
                <div style={{textAlign:'start'}}>
                  <label htmlFor="password">Password</label>
                  <input className="animated-border" disabled={loginPressed} type="password" placeholder="Password" id="password" required onChange={e => {
                      setPassword(e.target.value);
                      e.preventDefault();
                    }}/>

                  <button type="button" onClick={handleLoginClick}><div style={{display: `${!loginPressed?'none' : ''}`}}><SmallLoadingSpinner></SmallLoadingSpinner></div><div style={{display: `${loginPressed?'none' : ''}` }}>Log In</div></button>

                  <a href="#" onClick={handleForgotPasswordClick}><h2 style={{textAlign:'center'}}>Forgot Password</h2></a>
                </div>
              )}
            </div>
            )}
            {!emailSent && (
              <div>
                <p>
                  An account reset email will have been sent to the provided email if an account exists.
                </p>
              </div>
            )}
        </form>
    </body>
  );
  
};

export default LoginScreen;
