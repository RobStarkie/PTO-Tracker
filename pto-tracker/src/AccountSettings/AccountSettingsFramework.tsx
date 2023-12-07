import React, {useEffect, useState} from "react";
//import './AccountSettings.css'
import StandardUserAccountSettings from "./AccountSettingsComponents/StandardUserAccountSettings";

interface AccountSettingProps {
    handleLogout:(value: boolean | ((prevVar: boolean) => boolean)) => void;
    username:string;
    getToken: () => string;
}


const AccountSettingsFramework: React.FC<AccountSettingProps> = ({ handleLogout,  username, getToken}) => {
    const token : string = getToken();
    return (
        <div className="AccountSettings"> 
            <StandardUserAccountSettings handleLogout={handleLogout} username={username} getToken={getToken}></StandardUserAccountSettings>
        </div>
    );
};

export default AccountSettingsFramework;