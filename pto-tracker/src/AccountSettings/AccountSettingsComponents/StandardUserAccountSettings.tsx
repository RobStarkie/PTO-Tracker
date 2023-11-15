import { useState } from "react";
import './StandardUserAccountSettings.css'

interface AccountSettingProps {
    handleLogout:(value: boolean | ((prevVar: boolean) => boolean)) => void;
    username:string;
}


const StandardUserAccountSettings: React.FC<AccountSettingProps> = ({ handleLogout, username }) => {
    const [password1, setPassword1] = useState<string | null>(null);
    const [password2, setPassword2] = useState<string | null>(null);

    const handleNewHolidayRequest = () => {
        //submit new holiday request
        //submitNewRequest(startDate, endDate);
      };

    return (
        
        <body className="SUACBody">
            <form className="SUACForm">
                <h1 className="SUACH1">Change Password</h1>
                <h2 className="SUACH2">username: {username}</h2>
                <label className="SUACPWLabel" htmlFor="password">Password</label>
                <input className="SUACPasswordInput"type="password" placeholder="Password" id="password1" required onChange={e =>{
                    setPassword1(e.target.value);
                    e.preventDefault();
                }} />
                <label className="SUACPWLabel" htmlFor="password">Password</label>
                <input className="SUACPasswordInput" type="password" placeholder="Re-enter Password" id="password2" required onChange={e => {
                    setPassword2(e.target.value);
                    e.preventDefault();
                }}/>

                <button className="SUACButton"onClick={handleNewHolidayRequest}>Submit New Password</button> 
            </form>
        </body>
        
    );
};

export default StandardUserAccountSettings;

