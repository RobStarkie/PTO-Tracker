import React, {useEffect, useState} from "react";
import './LeftList.css'

interface LeftListProps {
    content: string;
}

const holidayRequests  = [{
    id: 'user1',
    startDate: '2023-11-01',
    endDate: '2023-11-06',
    status: 'approved'
}, {
    id: 'user1',
    startDate: '2023-12-10',
    endDate: '2023-12-12',
    status: 'denied'
}, {
        id: 'user2',
        startDate: '2024-01-09',
        endDate: '2024-01-13',
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