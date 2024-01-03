import React, { useEffect, useState, useLayoutEffect } from "react";
import './LineManager.css';
import Tooltip from "@mui/material/Tooltip";
import { profile } from "console";
import PTORequests from './TeamRequests';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import MapView from "./MapView";

interface LineManagerProps {
}

const LineManagerPage: React.FC<LineManagerProps> = () => {
    const [currYear, setCurrYear] = useState(new Date().getFullYear());
    const [currMonth, setCurrMonth] = useState(new Date().getMonth());
    const [daysTag, setDaysTag] = useState<JSX.Element | null>(null);
    const [currentDate, setCurrentDate] = useState<string>('');
    const [show, setShow] = useState(false);
    const [userListNumber, setUserListNumber] = useState(Number);
    const [render, setRender] = useState(false);
    // React state for selected data
    const [selectedHoliday, setSelectedHoliday] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    // Manage the visibility of the modal (map)
    const [showMapModal, setShowMapModal] = useState(false);


    const [teamMembers, setTeamMembers] = useState<user_details[]>([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleMapClose = () => setShowMapModal(false)

    type holiday = {
        id: any,
        status: string,
        start: string,
        end: string,
        postcode: string,
        lat: number,
        lng: number,
    };
    
    type user_details = {
        user: string,
        firstName: string,
        secondName: string,
        email: string,
        phoneNumber: string,
        profile_picture: string,
        holidays: holiday[]
    };
    type BackendUser = {
        UserID: number;
        FirstName: string;
        SecondName: string;
        Email: string;
        PhoneNumber: number;
        ProfilePicture: string;
        Holidays: {}; // If this field is not used, consider removing it or defining it properly
        HolidayJson: BackendHoliday[];
    };
    
    type BackendHoliday = {
        id: any;
        RequestId: number;
        UserId: number;
        Start: string;
        End: string;
        Status: string;
        Postcode: string;
        Lat: number;
        Lng: number;
    };



    const team_members : user_details[] = teamMembers

    const team_members_test : user_details[] = [
        {
            user : "Matt Connolly", 
            firstName: "Matt",
            secondName: "Connolly",
            email: "temp@email.com",
            phoneNumber: "12345678910",
            profile_picture : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgfQVsavMhO0GRho8eTKGOpUyyDgmQx8mA6B6M6ovOcA&s",
            holidays : [
                {
                    id : '1',
                    status : "approved",
                    start : "2023-11-15",
                    end: "2023-11-25",
                    postcode: "QQQ 111",
                    lat: 41.383942,
                    lng: 2.176084
                }
            ]
        },
        {
            user : "Robert Starkie",
            firstName: "Robert",
            secondName: "Starkie",
            email: "temp@email.com",
            phoneNumber: "12345678910",
            profile_picture : "https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp",
            holidays : [
                {
                    id : '2',
                    status : "review",
                    start : "2023-11-01",
                    end: "2023-11-03",
                    postcode: "ABC 123",
                    lat: 52.341419,
                    lng: 4.888043
                },
                {
                    id : '3',
                    status : "review",
                    start : "2023-11-19",
                    end: "2023-12-24",
                    postcode: "DEF 456",
                    lat: 55.948547,
                    lng: -3.363355
                }
            ]
        }
    ];

    useLayoutEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:5000/api/secured/team-view',  {
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(response => {
                console.log("raw data: ", response.data)
            const transformedData = transformData(response.data);
            setTeamMembers(transformedData);
            renderCalendar();
        }) 
        .catch(error => {
            console.error('Error:', error);
        });
        
        
        // Depend on currYear and currMonth if the data fetching depends on them
    }, [render,currYear, currMonth]);
    
    useEffect(() => {
        if (teamMembers.length > 0) {
            
        }
        // This hook will run when teamMembers changes
    }, [teamMembers]);
    
    
    const transformData = (responseData: { teamMembers: BackendUser[] }) => {//: BackendUser[]) => {
        // Access the team members array within the responsedata object:
        const teamMembers = responseData.teamMembers;

        if (!Array.isArray(teamMembers)) {
            console.error('teamMembers is not an array');
            return [];
        }
        return teamMembers.map((member) => ({
            user: `${member.FirstName} ${member.SecondName}`,
            firstName: member.FirstName,
            secondName: member.SecondName,
            email: member.Email,
            phoneNumber: member.PhoneNumber.toString(),
            profile_picture: member.ProfilePicture,
            holidays: member.HolidayJson.map(holiday => ({
                id: holiday.id,
                status: holiday.Status ? holiday.Status.replace('Status.', '').toLowerCase() : 'unknown',
                start: holiday.Start,
                end: holiday.End,
                postcode: holiday.Postcode,
                lat: holiday.Lat,
                lng: holiday.Lng
            }))
        }));
    };

    const handleIconClick = (iconId: string) => {
        if (iconId=="prev") {
            const date = new Date(currYear, currMonth-1, new Date().getDate());
            setCurrYear(date.getFullYear());
            setCurrMonth(date.getMonth());
        }
        else {
            const date = new Date(currYear, currMonth+1, new Date().getDate());
            setCurrYear(date.getFullYear());
            setCurrMonth(date.getMonth());
        }
    }

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];


    // When the user is clicked on
    const handleSelectedHoliday = (data: any, employee: any) => {
        setSelectedHoliday(data);
        setSelectedEmployee(employee);
        setShowMapModal(true);
    };
    // user_template to be displayed when clicked on
    var user_template = (employee: user_details, startDate: number, endDate: number, holiday: holiday) => {
        return <div className='users-row' onClick={() => handleSelectedHoliday(holiday, employee)} style={{ gridColumnStart: startDate + 2, gridColumnEnd: endDate + 3 }}>
            <Tooltip title={"PTO Status: " + holiday.status} followCursor children={<div className={holiday.status} id={holiday.id}></div>}></Tooltip></div>
    }
    

    const renderCalendar = () => {
        const date = new Date();
        const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
        const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
        const lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
        const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        let grid_items = [];
        let first_item = <div style={{gridColumnStart:1,gridColumnEnd:3}}></div>;
        grid_items.push(first_item);
        for (let i = 1; i <= lastDateofMonth; i++) {
            grid_items.push(<div className='dates-row' style={{gridColumnStart:i+2, gridColumnEnd:i+3}}>{i}</div>);
        }

        for (let i = 1; i <= lastDateofMonth; i++) {
            grid_items.push(<div className='days-row' style={{gridColumnStart:i+2, gridColumnEnd:i+3}}>{dayNames[new Date(currYear,currMonth, i).getDay()]}</div>);
        }

        for (let i = 0; i < team_members.length; i++) {
            const team_member =  team_members[i]; // teamMembers[i];  data from flask backend here
            //const team_member = team_members[userListNumber]
            grid_items.push(
                <div className="team-member" onClick={e => {
                                                        handleShow();
                                                        setUserListNumber(i);
                                            }} 
                    style={{gridColumnStart:1, gridColumnEnd:3}}>
                    <img className="profile-picture" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgfQVsavMhO0GRho8eTKGOpUyyDgmQx8mA6B6M6ovOcA&s"}></img>
                    {team_member.user}
                </div>);
            for (let j = 0; j < team_member.holidays.length; j++) {
                const holiday = team_member.holidays[j];
                if (new Date(holiday.start).getFullYear() == currYear) {
                    if (new Date(holiday.start).getMonth() == currMonth) {
                        const startDate = new Date(holiday.start).getDate();
                        if (new Date(holiday.end).getMonth() == currMonth) {
                            const endDate = new Date(holiday.end).getDate();
                            console.log("holiday.start : " + holiday.start + ", j counter = " + j);
                            console.log(`Holiday ${j}: `, holiday);

                            grid_items.push(user_template(team_member, startDate, endDate, holiday));
                        }
                        else {
                            const endDate = lastDateofMonth;
                            grid_items.push(user_template(team_member,startDate, endDate, holiday));
                        }
                    }
                    else {
                        if (new Date(holiday.end).getMonth() == currMonth) {
                            const endDate = new Date(holiday.end).getDate();
                            const startDate = 1;
                            grid_items.push(user_template(team_member, startDate, endDate, holiday));
                        }
                    }
                }
            }
        }
        setDaysTag(<div className="calendar-grid">{grid_items}</div>);
        setRender(true)
    }

    const handleRender = async () => {
        setRender(false)
    }
    const MapModal = () => (
        <Modal size="lg" show={showMapModal} onHide={() => setShowMapModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Map View</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <MapView
                    data={selectedHoliday}
                    employee = {selectedEmployee}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleMapClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );

    const userData = () => {
        // Check if teamMembers is loaded and userListNumber is valid
        if (!teamMembers || !teamMembers.length || userListNumber >= teamMembers.length) {
            return <div>Loading...</div>; // Or any other fallback UI
        }

        const team_member = team_members[userListNumber]//teamMembers[userListNumber];
        var data = <div style={{textAlign:'center', marginTop:'20px'}}>
            <img style={{borderRadius:'100%', width:'100px', padding:'10px'}} src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgfQVsavMhO0GRho8eTKGOpUyyDgmQx8mA6B6M6ovOcA&s"></img>
            <p>Username: <b>{team_member.user}</b></p>
            <p>Email: <b>{team_member.email}</b></p>
            <p>Phone Number: <b>{team_member.phoneNumber}</b></p>
        </div>;
        return data;
    };
    
    return (
        <div className="line-mananger-body">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                    <a>{userData()}</a>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            
            <div className="calendar-box">
                <div className="icons">
                <span id="prev" className="material-symbols-rounded" onClick={() => handleIconClick("prev")}>
                chevron_left
                </span>
                <span id="next" className="material-symbols-rounded"onClick={() => handleIconClick("next")}>
                chevron_right
                </span>
                <h3>{months[currMonth]+" "+currYear}</h3>
                </div>
                {daysTag}
            </div>
            <div>
                {render?
                    (<PTORequests teamMembers={team_members} handleRender={handleRender}/>) : (<div>Loading team members...</div>
                )}
            </div>
            <div className ="map-display">
                {showMapModal && <MapModal />}
            </div>
        </div>
    );
};

export default LineManagerPage;

function CGRect(x: any, arg1: number, y: any, arg3: number, width: any, arg5: number, height: any, arg7: number): any {
    throw new Error("Function not implemented.");
}