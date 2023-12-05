import React, {useEffect, useState} from "react";
import './HolidayRemaining.css'
import { PieChart } from '@mui/x-charts/PieChart';


interface HolidayRemainingProps {
    content: { id: string, startDate: string, endDate: string, status: string }[];
}


const HolidayRemaining: React.FC<HolidayRemainingProps> = ({ content }) => {
    const [pending, setPending] = useState(Number);
    const [approved, setApproved] = useState(Number);
    const [total, setTotal] = useState(Number);

    useEffect(() => {
        setTotal(25);
        setApproved(0);
        setPending(0);
        for (let i=0; i< content.length; i++) {
            var date1 = new Date(content[i].startDate);
            var date2 = new Date(content[i].endDate);
            var diff = Math.abs(date1.getTime() - date2.getTime());
            var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
            if (content[i].status=="APPROVED") {
                setApproved(approved+diffDays);
            } else if (content[i].status=="REVIEW") {
                setPending(pending+diffDays);
            }
        }

    },[content])

    return (
            <div className="holiday-remaining-box">
                <h3>Remaining PTO</h3>
                <div className="content">
                <PieChart slotProps={{ legend: {
                    direction: 'row',
                    padding: {
                        top:0,
                        bottom:0,
                        left:-20,
                        right:10
                    },
                    itemGap: 30,
                    position:{
                        horizontal: "left",
                        vertical: "bottom"
                    }
                    
                } }} width={350} height={450} series={[
                    { 
                        id: "Pending", data: [
                            { id: 0, value: pending, label: 'Pending', color: 'grey'},
                            { id: 1, value: approved, label: 'Taken'},
                            { id: 2, value: total-approved-pending, label: 'Remaining'},
                        ],
                        innerRadius: 60,
                        paddingAngle: 1,
                        cornerRadius: 4,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 60, additionalRadius: -5},

                    },
                ]}>
                </PieChart>
                </div>
            </div>
    );
};

export default HolidayRemaining;