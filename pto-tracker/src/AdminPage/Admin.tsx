import React, { useState } from "react";
import './Admin.css'
import CreateNewUser from './AdminComponent/CreateNewUser';
import AdminSelection from './AdminComponent/AdminSelection';
import shapes from '../HomeScreenFramework/shapes.svg';
import EditUser from "./AdminComponent/EditUser";

interface AdminProps {
    handleLogout:() => void;
}


const Admin: React.FC<AdminProps> = ({  }) => {

    const [isEditAccount, setEditAccount]= useState(false);
    const [isCreateAccount, setCreateAccount]= useState(false);
    const [username, setUsername] = useState("");
    const [isFoundAccount, setFoundAccount]= useState(false);

    const handleEditAccount = () => {
        setEditAccount(true);
        setCreateAccount(false);
    }


    const handleCreateAccount = () => {
        setUsername("");
        setEditAccount(false);
        setCreateAccount(true);
    }

    const handleUsername = (tempUsername: React.SetStateAction<string>) =>  {
        setUsername(tempUsername);       
    }

    return (
        <div className = "AdminPage">
            <ul className="adminUserList">
                <li className="AdminSelectionList"><AdminSelection handleEditAccount={handleEditAccount} handleCreateAccount={handleCreateAccount} handleUsername={handleUsername}></AdminSelection></li>
                {isCreateAccount ? (
                    <li className ="adminEditUser"> <EditUser username={username}></EditUser></li>
                ) : (
                    <li className ="adminCreateUser"> <CreateNewUser ></CreateNewUser></li>
                    
                )};
            </ul> 
            <img src={shapes} className="background-shapes"></img>                       
        </div>
    );
};

export default Admin;