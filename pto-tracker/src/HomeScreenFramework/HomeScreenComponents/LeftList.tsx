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
    status: 'reviewPending'
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

    
    const listItems = targetUser.map(request => {
        if (request.status == 'approved') {
            return <li><a className="approved">{request.startDate+", "+request.endDate +": "+request.status}</a></li>
        } else {
            return <li><a className="denied">{request.startDate+", "+request.endDate +": "+request.status}</a></li>
        };

    });
        

    return (
        <div className="holidayRequestList">
            <form className="holidayRequestListForm">
                <h1 className="listHeader">Holiday Requests</h1>
                <pre> </pre>
                <ul>{listItems}</ul>
            </form>
            
        </div>
    );
};

export default LeftList;