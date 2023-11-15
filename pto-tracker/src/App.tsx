import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import LoginScreen from './Login'
import Home from'./HomeScreenFramework/Home';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LineManagerPage from './LineManagerPage/LineManager';
import Layout from './Layout';

interface AppProps {
  // You can define any props here
}

const App: React.FC<AppProps> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  
  return (
    <div className="App">
      {isLoggedIn ? (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout handleLogout={handleLogout} />}>
                <Route index element={<Home handleLogout={handleLogout} />}/>
                <Route path="team-view" element={<LineManagerPage handleLogout={handleLogout}/>} />
                <Route path="account" element={<LineManagerPage handleLogout={handleLogout}/>} />
              </Route>
            </Routes>
          </BrowserRouter>
      ) : (
        <LoginScreen handleLogin={handleLogin} />
      )}
    </div>
  );
};


export default App;
