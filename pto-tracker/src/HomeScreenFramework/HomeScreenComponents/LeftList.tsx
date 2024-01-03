import React, {useEffect, useState} from "react";
import './LeftList.css'
import Home from "../Home";

interface LeftListProps {
    content: { id: string, startDate: string, endDate: string, status: string }[];
}
 
const LeftList: React.FC<LeftListProps> = ({ content }) => {
    const targetUser = content.filter(request =>
        request.id === request.id 
    );

    const listItems = targetUser.map(request => {
        console.log("request: "+ request.startDate + ", "+ request.endDate + ", "+ request.status)
        if (request.status == 'APPROVED') {
            return <li><div className="approved">{request.startDate+", "+request.endDate +": "+request.status}</div></li>
        } else if (request.status == 'REVIEW') {
            return <li><div className="pending">{request.startDate+", "+request.endDate +": "+request.status}</div></li>
        } else {
            return <li><div className="denied">{request.startDate+", "+request.endDate +": "+request.status}</div></li>
        };

    });
    
    return (
        <div className="holidayRequestList">
            <div className="holidayRequestListForm">
                <h1 className="listHeader">Holiday Requests</h1>
                <ul>{listItems}</ul>
            </div> 
            
        </div>
    );
};

export default LeftList;