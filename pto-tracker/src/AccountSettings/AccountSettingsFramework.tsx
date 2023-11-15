import React, {useEffect, useState} from "react";
//import './AccountSettings.css'
import StandardUserAccountSettings from "./AccountSettingsComponents/StandardUserAccountSettings";

interface AccountSettingProps {
    handleLogout:(value: boolean | ((prevVar: boolean) => boolean)) => void;
    username:string;
}


const AccountSettingsFramework: React.FC<AccountSettingProps> = ({ handleLogout,  username}) => {
    return (
        <div className="AccountSettings"> 
            <StandardUserAccountSettings handleLogout={handleLogout} username={username} ></StandardUserAccountSettings>
        </div>
    );
};

export default AccountSettingsFramework;