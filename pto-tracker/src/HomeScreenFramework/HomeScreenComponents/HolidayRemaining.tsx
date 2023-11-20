import React, {useEffect, useState} from "react";
import './HolidayRemaining.css'
import { PieChart } from '@mui/x-charts/PieChart';


interface HolidayRemainingProps {
    content: {pending:number, approved:number, remaining:number, total:number};
}


const HolidayRemaining: React.FC<HolidayRemainingProps> = ({ content }) => {

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
                            { id: 0, value: 10, label: 'Pending', color: 'grey'},
                            { id: 1, value: 15, label: 'Taken'},
                            { id: 2, value: 20, label: 'Remaining'},
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