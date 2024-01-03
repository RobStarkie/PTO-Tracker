import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import './Home.css';
import LeftList from './HomeScreenComponents/LeftList';
import Calendar from './HomeScreenComponents/MiddleCalendar';
import RightAddRequest from "./HomeScreenComponents/RightAddRequest";
import HolidayRemaining from './HomeScreenComponents/HolidayRemaining';
import axios, { AxiosResponse } from 'axios';
import { request } from "http";
import { data } from "jquery";
import { Construction } from "@mui/icons-material";

interface HomeProps {
    handleLogout: () => void;
    getToken: () => string;
}

const Home: React.FC<HomeProps> = ({handleLogout, getToken}) => {
    const token : string = getToken();
    const [data, setData] = useState([{ id: "", startDate: "", endDate: "", status: "" }])
    
    useLayoutEffect(() => {
        axios.get('http://localhost:5000/api/secured/getHolidays', { headers: { Authorization: token }})
        .then(response => {
            let list = response.data;
            console.log(list.length);
            setData(transformData(response.data))  
            /*for (let i = 0; i < list.length; i=i+4) {
                let j =i
                const hr = {
                    id:list[j++],
                    startDate:list[j++],
                    endDate:list[j++],
                    status:list[j++],
                    
                };
                
                holidayRequests.push(hr);        
            }*/
            //setData(holidayRequests);
        })
        .catch(TypeError => {
            console.error('Error:', TypeError);
        });
        
    },[]);

    const transformData = (responseData: { JSONHolidays: any; }) => {//: BackendUser[]) => {
        // Access the team members array within the responsedata object:
        const ptoRequests = responseData.JSONHolidays;

        if (!Array.isArray(ptoRequests)) {
            console.error('teamMembers is not an array');
            return [];
        }
        return ptoRequests.map((request) => ({
            id: request.UserID,
            startDate: request.Start,
            endDate: request.End,
            status: request.Status,
        }));
    };

    const holidayRequests: { id: string; startDate: string; endDate: string; status: string; }[] = [];

    const holidayRemaining = {
        remaining : 0,
        pending: 0,
        total: 25,
        approved: 0,
    } 

    return (
        <div id = "homePage">
            <ul className="horizontal-list">
                <li><LeftList content={data}></LeftList></li>
                <li><Calendar content={data}></Calendar></li>
                <li><RightAddRequest content='' getToken={getToken}></RightAddRequest></li>
                <li><HolidayRemaining content={data}></HolidayRemaining></li>
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

