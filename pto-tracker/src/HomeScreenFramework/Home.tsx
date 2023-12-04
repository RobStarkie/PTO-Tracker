import React, { useEffect } from "react";
import './Home.css';
import LeftList from './HomeScreenComponents/LeftList';
import Calendar from './HomeScreenComponents/MiddleCalendar';
import RightAddRequest from "./HomeScreenComponents/RightAddRequest";
import HolidayRemaining from './HomeScreenComponents/HolidayRemaining';
import axios, { AxiosResponse } from 'axios';
import { request } from "http";
import { data } from "jquery";


interface HomeProps {
    handleLogout: () => void;
    getToken: () => string;
}



const Home: React.FC<HomeProps> = ({handleLogout, getToken}) => {

    useEffect(() => {
        let ignore = false;
        
        if (!ignore)  getHolidayRequets()
        return () => { ignore = true; }
        },[]);

    const token : string = getToken();
    
    const getHolidayRequets = () => {
        console.log("getting holidays from db")
        console.log("token: " + token)
        axios.get('http://localhost:5000/make-holiday-request', { headers: { Authorization: `Bearer ${token}` }})
        .then(response => {
            console.log("response: "+(response.data))
            //holidayRequests.push())   
        })
        .catch(error => {
            console.error('Error:', error);
        });
        console.log(holidayRequests)
    }

    const holidayRequests = [{
        id: 'user1',
        startDate: '2023-11-01',
        endDate: '2023-11-06',
        status: 'confirmed'
    }, {
        id: 'user1',
        startDate: '2023-12-10',
        endDate: '2023-12-12',
        status: 'pending'
    }];

    const holidayRemaining = {
        remaining : 0,
        pending: 0,
        total: 0,
        approved: 0,
    }


    return (
        <div id = "homePage">
            <ul className="horizontal-list">
                <li><LeftList content={holidayRequests}></LeftList></li>
                <li><Calendar content={holidayRequests}></Calendar></li>
                <li><RightAddRequest content=''></RightAddRequest></li>
                <li><HolidayRemaining content={holidayRemaining}></HolidayRemaining></li>
            </ul>
        </div>
    );
};

export default Home;

function jsonify(response: AxiosResponse<any, any>): { id: string; startDate: string; endDate: string; status: string; } {
    throw new Error("Function not implemented.");
}
    function seEffect(arg0: () => import("react/jsx-runtime").JSX.Element) {
        throw new Error("Function not implemented.");
    }

