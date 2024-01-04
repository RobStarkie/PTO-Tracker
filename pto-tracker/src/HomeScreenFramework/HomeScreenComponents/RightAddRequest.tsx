import React, { useState } from "react";
import "./RightAddRequest.css"
import LoadingSpinner from "../../Components/LoadingSpinner";
import axios from "axios";
import Home from "../Home";
import { data } from "jquery";
import { object } from "prop-types";
import { string } from "yargs";


interface RightAddRequestProps {

    content : string
    getToken: () => string;
    handleAddNewHolidayRequest: (id: string, startDate: string, endDate: string) => void;
}

export const RightAddRequest: React.FC<RightAddRequestProps> = ({ content, getToken, handleAddNewHolidayRequest  }) => {
    
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [postcode, setPostcode] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const token : string = getToken();

    const handleNewHolidayRequest = () => {
        setIsLoading(true); // start loading
        const token = localStorage.getItem('token');
        const postData = {
            "startDate": startDate,
            "endDate": endDate,
            "postcode": postcode
        }
        const newData: object = {
            id: '0',
            startDate: postData.startDate,
            endDate: postData.endDate,
            status: "REVIEW"
        }
       
        handleAddNewHolidayRequest("0", startDate + '', endDate + '')
        axios.post('http://localhost:5000/api/secured/addNewHolidayRequest',postData,{headers: { Authorization: `${token}` }})
        .then(response => {
            console.log(response.data)
            setIsLoading(false);
            setSubmitted(true);
            // Clear input fields
            setStartDate(null);
            setEndDate(null);
            setPostcode(null);
            
        })
        .catch(error => {
            console.error('Error:', error);
            setIsLoading(false);
        });
        //submit new holiday request
        //submitNewRequest(startDate, endDate);
    };
    if (isLoading) {
        return <LoadingSpinner isLoading={false} />;
    }

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

                <label htmlFor="postcode">Hotel Location</label>
                <input type="string" placeholder="ABC 123" id="postcode" required onChange={e => {
                    setPostcode(e.target.value);
                    e.preventDefault();
                }} />
                <button className="request-button" onClick={handleNewHolidayRequest}>
                    {submitted ? "Submit Another Request" : "Submit New Request"}
                </button>
            </div>
        </div>
    );
};

export default RightAddRequest;