import React from 'react';
import './TeamRequests.css';

type holiday = {status:string,start:string,end:string};
type user_details = {user:string, profile_picture:string, holidays:holiday[]};

interface PTORequestsProps {
    teamMembers : user_details[]
}

const PTORequests: React.FC<PTORequestsProps> = ({ teamMembers }) => {

    const requestCard = (request : holiday, team_member : user_details) => {
        return <div className="request-card">
            <img src={team_member.profile_picture}></img>
            <h3>{team_member.user}</h3>
            <p>{request.start} - {request.end}</p>
            <button><span className="material-symbols-outlined">done</span></button>
            <button><span className="material-symbols-outlined">close</span></button>
        </div>
    }



    const listItems = () => {
        let listItems = [];
        for (let i = 0; i < teamMembers.length; i++) {
            listItems.push(teamMembers[i].holidays.map(request => {
                if (request.status == "pending") {
                    return <li>{requestCard(request, teamMembers[i])}</li>
                }
            }));
        }
        return listItems;
    }




    return (
        <div className="PTO-Requests">
            <h3>
                Pending Requests
            </h3>
            <ol>
                {listItems()}
            </ol>
        </div>
    );
};

export default PTORequests;
