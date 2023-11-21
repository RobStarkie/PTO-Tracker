import React, { useState } from "react";
import "./RightAddRequest.css"
import LoadingSpinner from "../../Components/LoadingSpinner";


interface RightAddRequestProps {
    content : string
}

export const RightAddRequest: React.FC<RightAddRequestProps> = ({ content }) => {
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleNewHolidayRequest = () => {
        setIsLoading(true);
        // Simulate loading, you can replace this with your actual loading logic
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // Set a timeout to simulate loading for 3 seconds


        // Clear the timeout on component unmount to avoid memory leaks
        return () => clearTimeout(loadingTimeout);


        //submit new holiday request
        //submitNewRequest(startDate, endDate);
    };

    return (
        <div className="rightComponentContainer">
            <LoadingSpinner isLoading={isLoading}></LoadingSpinner>
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