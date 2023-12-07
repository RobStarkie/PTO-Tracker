import React, { useState } from "react";
import "./RightAddRequest.css"
import LoadingSpinner from "../../Components/LoadingSpinner";
import axios from "axios";
import Home from "../Home";


interface RightAddRequestProps {
    content : string
    getToken: () => string;
}

export const RightAddRequest: React.FC<RightAddRequestProps> = ({ content, getToken }) => {
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const token : string = getToken();

    const handleNewHolidayRequest = () => {
        console.log(token)
        const postData = {
            "startDate" : startDate,
            "endDate" : endDate
          }
        axios.post('http://localhost:5000/addNewHolidayRequest',postData,{headers: { Authorization: `Bearer ${token}` }})
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.error('Error:', error);
        });
        //submit new holiday request
        //submitNewRequest(startDate, endDate);
    };

    return (
        <div className="rightComponentContainer">
            <div className="rightComponentForm">
                <h1 className="rightComponentHeader">Enter a New Request</h1>
                <label htmlFor="startDate">Start Date</label>
                <input type="date" placeholder="dd/mm/yyyy" id="startDate" required onChange={e => {
                    setStartDate(e.target.value);
                    e.preventDefault();
                }} />


                <label htmlFor="endDate">End Date</label>
                <input type="date" placeholder="dd/mm/yyyy" id="endDate" required onChange={e => {
                    setEndDate(e.target.value);
                    e.preventDefault();
                }} />
                <button className="request-button" onClick={handleNewHolidayRequest}>Submit New Request</button>
            </div>
        </div>
    );
};

export default RightAddRequest;