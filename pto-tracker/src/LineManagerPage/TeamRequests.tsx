import React, {useState} from 'react';
import './TeamRequests.css';
import axios from 'axios';

type holiday = {id:string,status:string,start:string,end:string};
type user_details = {user:string, profile_picture:string, holidays:holiday[]};

interface PTORequestsProps {
    teamMembers : user_details[]
    handleRender: () => void;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


const showElementById = (elementId: string, opacity:string): void => {

    
    const element = document.getElementById(elementId);
    if (element) {
      element.style.opacity = opacity;
    } else {
      console.warn(`Element with id ${elementId} not found.`);
    }
  };

const PTORequests: React.FC<PTORequestsProps> = ({ teamMembers , handleRender}) => {
    const [tempHoliday, setTempHoliday] = useState<{id:string,status:string,start:string,end:string}>()

    const startHover = (id:string):void => {
        showElementById(id, '60%');
    }

    const endHover = (id:string):void => {
        showElementById(id, '0%');
    }

    const approveRequest = async (request: {id:string,status:string,start:string,end:string}) => {
        
        const token = localStorage.getItem('token');
        const postData = {
            'status': 'APPROVED',
            'start': request.start,
            'end': request.end
        }
        console.log("Sending data to backend:", postData);

        axios.post('http://localhost:5000/api/secured/approveRequest', postData, { headers: { Authorization: `${token}` }})
        .then((response) => {
            console.log(response.data)
        })
        .catch(TypeError => {
            console.error('Error:', TypeError);
        });
        await delay(1000);
        handleRender()
    }

    const denyRequest = async (request: {id:string,status:string,start:string,end:string}) => {
        const token = localStorage.getItem('token');
        const postData = {
            'status': 'DENIED',
            'start': request.start,
            'end': request.end
        }
        console.log("Sending data to backend:", postData);

        axios.post('http://localhost:5000/api/secured/denyRequest', postData, { headers: { Authorization: `${token}` }})
        .then((response) => {
            console.log(response.data)
        })
            .catch(TypeError => {
            console.log("request.start: "+request.start)
            console.error('Error:', TypeError);
        });
        await delay(1000);
        handleRender()
    }


    const requestCard = (request : holiday, team_member : user_details) => {
        return <div className="request-card" onMouseEnter={() => startHover(request.id)} onMouseLeave={() =>endHover(request.id)}>
            <div style={{display:'flex'}}>
                <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgfQVsavMhO0GRho8eTKGOpUyyDgmQx8mA6B6M6ovOcA&s"}></img>
                <h3>{team_member.user}</h3>
            </div>
            <div style={{margin:'10px'}}>
                <p><b>Start: </b>{request.start}</p>
                <p><b>End: </b> {request.end}</p>
            </div>
            <div style={{display:'flex'}}>            
                <button onClick={e => {
                    approveRequest(request)
                }} style={{backgroundColor:'green'}}><span className="material-symbols-rounded">done</span></button>
                <button onClick={e => {
                    denyRequest(request)
                }} style={{backgroundColor:'red'}}><span className="material-symbols-rounded">close</span></button>
            </div>
        </div>
    }



    const listItems = () => {
        let requestElements: JSX.Element[] = [];
        for (let i = 0; i < teamMembers.length; i++) {
            teamMembers[i].holidays.forEach(request => {
                if (request.status === "review") {
                    requestElements.push(
                        <li key={request.id}>{requestCard(request, teamMembers[i])}</li>
                    );
                }
            });
        }
        
        if (requestElements.length === 0) {
            return <li><h5>There are currently no pending requests!</h5></li>;
        }
    
        return requestElements;
    };
    
    return (
        <div className="PTO-Requests">
            <h3>Pending Requests</h3>
            <ol>{listItems()}</ol>
        </div>
    );
};

export default PTORequests;
