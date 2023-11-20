import React, { useEffect, useState } from "react";
import './LineManager.css';
import Tooltip from "@mui/material/Tooltip";
import { profile } from "console";
import PTORequests from './TeamRequests'


interface LineManagerProps {
}

const LineManagerPage: React.FC<LineManagerProps> = () => {
    const [currYear, setCurrYear] = useState(new Date().getFullYear());
    const [currMonth, setCurrMonth] = useState(new Date().getMonth());
    const [daysTag, setDaysTag] = useState<JSX.Element | null>(null);
    const [currentDate, setCurrentDate] = useState<string>('');

    type holiday = {status:string,start:string,end:string};
    type user_details = {user:string, profile_picture:string, holidays:holiday[]};

    const team_members : user_details[] = [
        {
            user : "Matt Connolly",
            profile_picture : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgfQVsavMhO0GRho8eTKGOpUyyDgmQx8mA6B6M6ovOcA&s",
            holidays : [
                {
                    status : "confirmed",
                    start : "2023-11-15",
                    end : "2023-11-25"
                }
            ]
        },
        {
            user : "Robert Starkie",
            profile_picture : "https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp",
            holidays : [
                {
                    status : "pending",
                    start : "2023-11-01",
                    end : "2023-11-03"
                },
                {
                    status : "pending",
                    start : "2023-11-19",
                    end : "2023-12-24"
                }
            ]
        }
    ];

    useEffect(() => {
        renderCalendar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [currYear, currMonth]);

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

    const handleUserClick = () => {

    }

    var user_template = (startDate:number, endDate:number, holiday:holiday) => {
        return <div className='users-row' onClick={handleUserClick} style={{gridColumnStart:startDate+2, gridColumnEnd:endDate+3}}><Tooltip title={"PTO Status: "+holiday.status} followCursor children={<div className={holiday.status}></div>}></Tooltip></div>
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
            const team_member = team_members[i];
            grid_items.push(<div className="team-member" style={{gridColumnStart:1, gridColumnEnd:3}}><img className="profile-picture" src={team_member.profile_picture}></img>{team_member.user}</div>);
            for (let j = 0; j < team_member.holidays.length; j++) {
                const holiday = team_member.holidays[j];
                if (new Date(holiday.start).getFullYear() == currYear) {
                    if (new Date(holiday.start).getMonth() == currMonth) {
                        const startDate = new Date(holiday.start).getDate();
                        if (new Date(holiday.end).getMonth() == currMonth) {
                            const endDate = new Date(holiday.end).getDate();
                            grid_items.push(user_template(startDate, endDate, holiday));
                            
                        }
                        else {
                            const endDate = lastDateofMonth;
                            grid_items.push(user_template(startDate, endDate, holiday));
                        }
                        
                    }
                    else {
                        if (new Date(holiday.end).getMonth() == currMonth) {
                            const endDate = new Date(holiday.end).getDate();
                            const startDate = 1;
                            grid_items.push(user_template(startDate, endDate, holiday));
                        }
                    }  
                    
                }
            }
        }
        setDaysTag(<div className="calendar-grid">{grid_items}</div>);

    }

    return (
        <div className="line-mananger-body">
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
            <PTORequests teamMembers={team_members}></PTORequests>
        </div>
    );
};

export default LineManagerPage;