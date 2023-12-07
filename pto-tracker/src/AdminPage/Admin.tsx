import React, { useState } from "react";
import './Admin.css'
import CreateNewUser from './AdminComponent/CreateNewUser';
import AdminSelection from './AdminComponent/AdminSelection';
import shapes from '../HomeScreenFramework/shapes.svg';
import EditUser from "./AdminComponent/EditUser";

interface AdminProps {
    handleLogout:() => void;
    getToken: () => string;
}


const Admin: React.FC<AdminProps> = ({ getToken }) => {
    const token : string = getToken();
    const [user, setUser] = useState({userID: "", TeamID: "", Email: "", FirstName: "", SecondName: "", password: "", ProfilePicture:"", phoneNumber:"", LineManager: false, LineManagerID: "", TotalHolidays: "", Admin: false});
    const [isEditAccount, setEditAccount]= useState(false);
    const [isCreateAccount, setCreateAccount]= useState(true);
    const [username, setUsername] = useState("");
    const [isFoundAccount, setFoundAccount]= useState(false);

    const users = [{
        id: 'tempUser',
        firstName: 'tempFirstName',
        secondName: 'tempSecondName',
        email: 'tempEmail',
        password: 'tempPassword',
        lineManager: 'tempManager',
        numberOfHolidays: '25'
    }, {
        id: 'someUser',
        firstName: 'tempFirstName',
        secondName: 'tempSecondName',
        email: 'tempEmail',
        password: 'tempPassword',
        lineManager: 'tempManager',
        numberOfHolidays: '25'
    }];

    const handleEditAccount = () => {
        setEditAccount(true);
        setCreateAccount(false);
    }


    const handleCreateAccount = () => {
        setUsername("");
        setEditAccount(false);
        setCreateAccount(true);
    }

    const handleUser = (user: {userID: string, TeamID: string, Email: string, FirstName: string, SecondName: string, password: string, ProfilePicture:string, phoneNumber:string, LineManager: boolean, LineManagerID: string, TotalHolidays: string, Admin: boolean}) =>  {
        setUser(user);     
    }

    return (
        <div className = "AdminPage">
            <ul className="adminUserList">
                <li className="AdminSelectionList"><AdminSelection handleEditAccount={handleEditAccount} handleCreateAccount={handleCreateAccount} handleUser={handleUser} getToken={getToken}></AdminSelection></li>
                {isCreateAccount ? (
                    <li className ="adminCreateUser"> <CreateNewUser getToken={getToken}></CreateNewUser></li>
                ) : (
                    <li className ="adminEditUser"> <EditUser user={user} getToken={getToken}></EditUser></li>
                )}
            </ul>               
        </div>
    );
};

export default Admin;