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
            return <li><div className="approved">{request.startDate+", "+request.endDate +": "+request.status}</div></li>
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