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

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(false);
  };

  const handleLoginClick = () => {
    handleLogin();
  };

  const sendPasswordReset = () => {
    setShowForgotPassword(true);
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

            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Email or Phone" id="username" required onChange={e =>{
                setUsername(e.target.value);
                e.preventDefault();
              }} />

            {!showForgotPassword && (
              <div>
                <button onClick={sendPasswordReset}>Send Reset Link</button>
              </div>
            )}

            {showForgotPassword && (
              <div>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" required onChange={e => {
                    setPassword(e.target.value);
                    e.preventDefault();
                  }}/>

                <button onClick={handleLoginClick}>Log In</button>

                <a href="#" onClick={handleForgotPasswordClick}><h2>Forgot Password</h2></a>
              </div>
            )}
        </form>
    </body>
  );
};

export default LoginScreen;
