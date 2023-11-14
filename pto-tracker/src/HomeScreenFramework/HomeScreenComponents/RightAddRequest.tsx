import React, { useState } from "react";
import './RightAddRequest.css'

interface RightAddRequestProps {
    content: string;
}

const RightAddRequest: React.FC<RightAddRequestProps> = ({ content }) => {
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    const handleNewHolidayRequest = () => {
        //submit new holiday request
        //submitNewRequest(startDate, endDate);
      };

    return (
        <div className="rightComponentContainer"> 
            <form className="rightComponentForm">
                <h1 className="rightComponentHeader">Enter a New Request</h1>
                <label htmlFor="startDate">Start Date</label>
                <input type="text" placeholder="dd/mm/yyyy" id="startDate" required onChange={e =>{
                    setStartDate(e.target.value);
                    e.preventDefault();
                }} />


                <label htmlFor="endDate">End Date</label>
                <input type="text" placeholder="dd/mm/yyyy" id="endDate" required onChange={e => {
                    setEndDate(e.target.value);
                    e.preventDefault();
                }}/>

                <button onClick={handleNewHolidayRequest}>Submit New Request</button>    
            </form>
        </div>
    );
};

export default RightAddRequest;