import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import LoginScreen from './Login'
import Home from'./HomeScreenFramework/Home';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LineManagerPage from './LineManagerPage/LineManager';
import Layout from './Layout';
import AccountSettingsFramework from './AccountSettings/AccountSettingsFramework';

interface AppProps {
  // You can define any props here
}

const App: React.FC<AppProps> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleUsername =( tempUsername: React.SetStateAction<string>) =>  {
    setUsername(tempUsername);
  }



  
  return (
    <div className="App">
      {isLoggedIn ? (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout handleLogout={handleLogout} />}>
                <Route index element={<Home handleLogout={handleLogout} />}/>
                <Route path="account" element={<AccountSettingsFramework handleLogout={handleLogout} username={username} />} />
                <Route path="team-view" element={<LineManagerPage/>} />
              </Route>
            </Routes>
          </BrowserRouter>
      ) : (
        <LoginScreen handleLogin={handleLogin} handleUsername={handleUsername} />
      )}
    </div>
  );
};


export default App;
