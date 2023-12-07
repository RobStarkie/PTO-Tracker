import React, {useEffect, useState} from 'react';
import './App.css';
import LoginScreen from './Login'
import Home from'./HomeScreenFramework/Home';
import { BrowserRouter, Routes, Route, useHref } from "react-router-dom";
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
  const [token, setToken] = useState("");
  const [user, setUser] = useState({userID: "", TeamID: "", Email: "", FirstName: "", SecondName: "", password: "", ProfilePicture:"", phoneNumber:"", LineManager: false, LineManagerID: "", TotalHolidays: "", Admin: false});

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const getToken = () => {
    return token;
  }

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setAdmin(false);
  };

  const handleUsername =( tempUsername: React.SetStateAction<string>) =>  {
    setUsername(tempUsername);
  }

  const handleToken = (tempToken: React.SetStateAction<string> ) => {
    setToken(tempToken);
  }

  const handleAdmin = async () => {
    setAdmin(true)
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <div className="AppAdmin">
          {isAdmin ? ( 
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout handleLogout={handleLogout} username={username} admin={isAdmin} />}>
                  <Route index element={<Admin handleLogout={handleLogout} getToken={getToken}/>}/>
                  <Route path="account" element={<AccountSettingsFramework handleLogout={handleLogout} username={username} getToken={getToken}/>} />
                  <Route path="createAccount" element={<CreateNewUser getToken={getToken}/>} />
                  <Route path="EditUserAccount" element={<EditUser user={user} getToken={getToken}/>}/>
                </Route>
              </Routes>
            </BrowserRouter>
          ) : (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout handleLogout={handleLogout} username={username} admin={isAdmin}/>}>
                  <Route index element={<Home handleLogout={handleLogout} getToken={getToken} />}/>
                  <Route path="account" element={<AccountSettingsFramework handleLogout={handleLogout} username={username} getToken={getToken} />} />
                  <Route path="team-view" element={<LineManagerPage/>} />
                </Route>
              </Routes>
            </BrowserRouter>
        )}
        </div>
      ) : (
        <LoginScreen handleLogin={handleLogin} handleUsername={handleUsername} handleAdmin={handleAdmin} handleToken={handleToken}/>
      )}
    </div>
  );
};

export default App;