import React, {useEffect, useState} from "react";
import './LeftList.css'

interface LeftListProps {
    content: { id: string; startDate: string; endDate: string; status: string; }[];
}


    
const LeftList: React.FC<LeftListProps> = ({ content }) => {
    const targetUser = content.filter(request =>
        request.id === 'user1'
    );

    
    const listItems = targetUser.map(request => {
        if (request.status == 'confirmed') {
            return <li><a className="approved">{request.startDate+", "+request.endDate +": "+request.status}</a></li>
        } else {
            return <li><a className="denied">{request.startDate+", "+request.endDate +": "+request.status}</a></li>
        };

    });
        

    return (
        <div className="holidayRequestList">
            <div className="holidayRequestListForm">
                <h1 className="listHeader">Holiday Requests</h1>
                <pre> </pre>
                <ul>{listItems}</ul>
            </div>
            
        </div>
    );
};

export default LeftList;