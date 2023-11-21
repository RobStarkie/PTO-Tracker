import React from 'react';
import './TeamRequests.css';

type holiday = {id:string,status:string,start:string,end:string};
type user_details = {user:string, profile_picture:string, holidays:holiday[]};

interface PTORequestsProps {
    teamMembers : user_details[]
}

const showElementById = (elementId: string, opacity:string): void => {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.opacity = opacity;
    } else {
      console.warn(`Element with id ${elementId} not found.`);
    }
  };

const PTORequests: React.FC<PTORequestsProps> = ({ teamMembers }) => {

    const startHover = (id:string):void => {
        showElementById(id, '60%');
    }

    const endHover = (id:string):void => {
        showElementById(id, '0%');
    }



    const requestCard = (request : holiday, team_member : user_details) => {
        return <div className="request-card" onMouseEnter={() => startHover(request.id)} onMouseLeave={() =>endHover(request.id)}>
            <div style={{display:'flex'}}>
                <img src={team_member.profile_picture}></img>
                <h3>{team_member.user}</h3>
            </div>
            <div style={{margin:'10px'}}>
                <p><b>Start: </b>{request.start}</p>
                <p><b>End: </b> {request.end}</p>
            </div>
            <div style={{display:'flex'}}>            
                <button style={{backgroundColor:'green'}}><span className="material-symbols-rounded">done</span></button>
                <button style={{backgroundColor:'red'}}><span className="material-symbols-rounded">close</span></button>
            </div>
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
