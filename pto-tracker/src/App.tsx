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
import Admin from './AdminPage/Admin'
import CreateNewUser from './AdminPage/AdminComponent/CreateNewUser';
import EditUser from './AdminPage/AdminComponent/EditUser';

interface AppProps {
  // You can define any props here
}

const App: React.FC<AppProps> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isAdmin, setAdmin] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setAdmin(false);
  };

  const handleUsername =( tempUsername: React.SetStateAction<string>) =>  {
    setUsername(tempUsername);
  }

  const handleAdmin = () => {
    setAdmin(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <div className="AppAdmin">
          {isAdmin ? ( 
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout handleLogout={handleLogout} admin={isAdmin}/>}>
                  <Route index element={<Admin handleLogout={handleLogout} />}/>
                  <Route path="account" element={<AccountSettingsFramework handleLogout={handleLogout} username={username} />} />
                  <Route path="createAccount" element={<CreateNewUser/>} />
                  <Route path="EditUserAccount" element={<EditUser username={username}/>}/>
                </Route>
              </Routes>
            </BrowserRouter>
          ) : (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout handleLogout={handleLogout} admin={isAdmin} />}>
                  <Route index element={<Home handleLogout={handleLogout} />}/>
                  <Route path="account" element={<AccountSettingsFramework handleLogout={handleLogout} username={username} />} />
                  <Route path="team-view" element={<LineManagerPage/>} />
                </Route>
              </Routes>
            </BrowserRouter>
        )};
        </div>
      ) : (
        <LoginScreen handleLogin={handleLogin} handleUsername={handleUsername} handleAdmin={handleAdmin} />
      )};
    </div>
  );
};

export default App;