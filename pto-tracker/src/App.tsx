import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Home from'./HomeScreenFramework/Home';

interface AppProps {
  // You can define any props here
}

const App: React.FC<AppProps> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
        <div>
          </div>
        //<Login handleLogin={handleLogin} />
      )}
    </div>
  );
};


export default App;
