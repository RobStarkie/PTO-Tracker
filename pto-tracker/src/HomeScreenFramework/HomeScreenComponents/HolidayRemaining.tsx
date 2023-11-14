import React, {useEffect, useState} from "react";
import './LeftList.css'

interface HolidayRemainingProps {
    content: {pending:number, approved:number, remaining:number, total:number};
}


const HolidayRemaining: React.FC<HolidayRemainingProps> = ({ content }) => {

    return (
        <body>
            <div className="holiday-remaining-box">
            </div>
        </body>
    );
};

export default HolidayRemaining;