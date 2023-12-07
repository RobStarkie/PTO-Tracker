import { useState } from "react";
import './StandardUserAccountSettings.css'
import { Padding } from "@mui/icons-material";
import axios from 'axios';

interface AccountSettingProps {
    handleLogout:(value: boolean | ((prevVar: boolean) => boolean)) => void;
    username:string;
    getToken: () => string;
}


const StandardUserAccountSettings: React.FC<AccountSettingProps> = ({ handleLogout, username, getToken}) => {
    const [password1, setPassword1] = useState<string | null>(null);
    const [password2, setPassword2] = useState<string | null>(null);
    const token : string = getToken();

    const submitChange = async () => {
        if (password1==password2) {
            const postData = {
                'password' : password1
            }
            console.log("new password: " + password1)
            axios.post('http://localhost:5000/editAccount',postData,{ headers: { Authorization: `Bearer ${token}` }})
            .then(response => {
                console.log("Account has been updated : " + response.data)
            })
            .catch(TypeError => {
                console.error('Error:', TypeError);
            });
        }
    };

    return (
        
        <body className="SUACBody">
            <form className="SUACForm">
                <h1 className="SUACH1">Change Password</h1>
                <h2 className="SUACH2">Account Email</h2>
                <p style={{padding:0, margin:0, color:'black'}}>{username}</p>
                <label className="SUACPWLabel" htmlFor="password">New Password</label>
                <input className="SUACPasswordInput"type="password" placeholder="Password" id="password1" required onChange={e =>{
                    setPassword1(e.target.value);
                    e.preventDefault();
                }} />
                <label className="SUACPWLabel" htmlFor="password">Re-enter New Password</label>
                <input className="SUACPasswordInput" type="password" placeholder="Re-enter Password" id="password2" required onChange={e => {
                    setPassword2(e.target.value);
                    e.preventDefault();
                }}/>

                <button className="SUACButton" onClick={submitChange}>Submit New Password</button> 
            </form>
        </body>
        
    );
};

export default StandardUserAccountSettings;

