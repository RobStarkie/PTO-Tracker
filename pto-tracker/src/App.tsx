import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

import LoginScreen from './Login'
import Home from'./HomeScreenFramework/Home';

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
        <Home handleLogout={handleLogout} />
      ) : (
        <LoginScreen handleLogin={handleLogin} />
      )}
    </div>
  );
};


export default App;
