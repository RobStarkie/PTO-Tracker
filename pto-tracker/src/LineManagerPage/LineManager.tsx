import React, { useEffect, useState } from "react";
import './LineManager.css';


interface LineManagerProps {
}

const LineManagerPage: React.FC<LineManagerProps> = () => {
    const [currYear, setCurrYear] = useState(new Date().getFullYear());
    const [currMonth, setCurrMonth] = useState(new Date().getMonth());
    const [daysTag, setDaysTag] = useState<JSX.Element | null>(null);
    const [currentDate, setCurrentDate] = useState<string>('');

    type holiday = {status:string,start:string,end:string};
    type user_details = {user:string, holidays:holiday[]};

    const team_members : user_details[] = [
        {
            user : "Matt",
            holidays : [
                {
                    status : "approved",
                    start : "2023-11-15",
                    end : "2023-11-25"
                }
            ]
        },
        {
            user : "Rob",
            holidays : [
                {
                    status : "pending",
                    start : "2023-11-01",
                    end : "2023-11-03"
                },
                {
                    status : "pending",
                    start : "2023-11-19",
                    end : "2023-11-24"
                }
            ]
        },
        {
            user : "Rob",
            holidays : [
                {
                    status : "pending",
                    start : "2023-11-01",
                    end : "2023-11-03"
                },
                {
                    status : "pending",
                    start : "2023-11-19",
                    end : "2023-11-24"
                }
            ]
        },
        {
            user : "Rob",
            holidays : [
                {
                    status : "pending",
                    start : "2023-11-01",
                    end : "2023-11-03"
                },
                {
                    status : "pending",
                    start : "2023-11-19",
                    end : "2023-11-24"
                }
            ]
        },
        {
            user : "Rob",
            holidays : [
                {
                    status : "pending",
                    start : "2023-11-01",
                    end : "2023-11-03"
                },
                {
                    status : "pending",
                    start : "2023-11-19",
                    end : "2023-11-24"
                }
            ]
        },
    ];

    useEffect(() => {
        renderCalendar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [currYear, currMonth]);

    const renderCalendar = () => {
        const date = new Date();
        const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
        const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
        const lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
        const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


        let grid_items = "<div style='grid-column-start:1;grid-column-end:3'></div>";
        for (let i = 1; i <= lastDateofMonth; i++) {
            grid_items += `<div class='dates-row' style='grid-column-start:${i+2}; grid-column-end:${i+3}'>${i}</div>`;
        }

        for (let i = 1; i <= lastDateofMonth; i++) {
            grid_items += `<div class='days-row' style='grid-column-start:${i+2}; grid-column-end:${i+3}'>${dayNames[new Date(currYear,currMonth, i).getDay()]}</div>`;
        }

        for (let i = 0; i < team_members.length; i++) {
            const team_member = team_members[i];
            grid_items += `<div style='grid-column-start:1; grid-column-end:3'>${team_member.user}</div>`;
            for (let j = 0; j < team_member.holidays.length; j++) {
                const holiday = team_member.holidays[j];
                const startDate = new Date(holiday.start).getDate();
                const endDate = new Date(holiday.end).getDate();
                grid_items += `<div class='users-row' style='grid-column-start:${startDate+2}; grid-column-end:${endDate+3}'><div class="coloured-box"></div></div>`;
            }
        }
        setDaysTag(<div className="calendar-grid" dangerouslySetInnerHTML={{ __html: grid_items }}></div>);

    }

    return (
        <div className="calendar">
                {daysTag}
        </div>
    );
};

export default LineManagerPage;