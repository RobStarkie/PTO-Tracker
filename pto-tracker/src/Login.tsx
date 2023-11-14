import React, { useState } from 'react';
import './Login.css';
import logo from './logo.png'

// Define the props interface if needed
interface LoginScreenProps {
    handleLogin: () => void;
}

// Functional component
const LoginScreen: React.FC<LoginScreenProps> = ({ handleLogin }) => {

  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(true);
  const [emailSent, setEmailSent] = useState(true);

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(false);
  };

  const setEmailSentClick = async () => {
    setEmailSent(false);
    await new Promise(r => setTimeout(r, 3000));
    setEmailSent(true);
    setShowForgotPassword(true);
  };

  const handleLoginClick = () => {
    handleLogin();
  };

  const sendPasswordReset = () => {
    setEmailSentClick();
  };


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
              <input type="text" placeholder="Email" id="username" required onChange={e =>{
                  setUsername(e.target.value);
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
                  <input type="password" placeholder="Password" id="password" required onChange={e => {
                      setPassword(e.target.value);
                      e.preventDefault();
                    }}/>

                  <button onClick={handleLoginClick}>Log In</button>

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
