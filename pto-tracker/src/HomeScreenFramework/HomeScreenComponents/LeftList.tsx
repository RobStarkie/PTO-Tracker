import React, {useEffect, useState} from "react";
import './LeftList.css'

interface LeftListProps {
    content: string;
}

const holidayRequests  = [{
    id: 'user1',
    startDate: '15/08/2024',
    endDate: '22/08/2024',
    status: 'approved'
}, {
    id: 'user1',
    startDate: '22/12/2024',
    endDate: '02/01/2025',
    status: 'denied'
}, {
        id: 'user2',
        startDate: '25/12/2024',
        endDate: '01/01/2025',
        status: 'approved'
}];


    
const LeftList: React.FC<LeftListProps> = ({ content }) => {
    const targetUser = holidayRequests.filter(request =>
        request.id === 'user1'
    );

    
    const listItems = targetUser.map(request =>
        <li><a href="">{request.startDate+", "+request.endDate +": "+request.status}</a></li>
    );

    return (
        <div className="holidayRequestList">
            <h1 className="listHeader">List of Holiday Requests</h1>
            <pre>  </pre>
            <ul>{listItems}</ul>
        </div>
    );
};

export default LeftList;