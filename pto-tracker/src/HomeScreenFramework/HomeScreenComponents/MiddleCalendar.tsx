import React, { useEffect, useState } from 'react';
import './MiddleCalendar.css'

interface MiddleCalendarProps {
    content: { id: string; startDate: string; endDate: string; status: string; }[];
}


const Calendar: React.FC<MiddleCalendarProps> = ({content}) => {

    const [currYear, setCurrYear] = useState(new Date().getFullYear());
    const [currMonth, setCurrMonth] = useState(new Date().getMonth());
    const [daysTag, setDaysTag] = useState<JSX.Element | null>(null);
    const [currentDate, setCurrentDate] = useState<string>('');
    

    function isDateInRange(dateToCheck: Date): string {
        var output:string = '';
        const currentDate:Date = new Date();
        if (dateToCheck.getDate() == currentDate.getDate() && dateToCheck.getMonth() == currentDate.getMonth() && dateToCheck.getFullYear() == currentDate.getFullYear()) {
            return 'active';
        }
        content.forEach((request) => {
            if (dateToCheck >= new Date(request.startDate) && dateToCheck <= new Date(request.endDate)) {
                output = request.status;
                return;
            }
        })
        return output;
    }

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
  
      let liTag = '';
  
      for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
      }

      for (let i = 1; i <= lastDateofMonth; i++) {
        const dateToCheck = new Date(currYear, currMonth, i);
        const status:string = isDateInRange(dateToCheck);
        liTag += `<li class="${status}">${i}</li>`;
      }
  
      for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
      }
  
      setCurrentDate(`${months[currMonth]} ${currYear}`);
      setDaysTag(<ul className="days" dangerouslySetInnerHTML={{ __html: liTag }}></ul>);
    };
  
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


  return (
    <body>
      <div className="wrapper">
        <header>
          <p className="current-date">{currentDate}</p>
          <div className="icons">
            <span id="prev" className="material-symbols-rounded" onClick={() => handleIconClick("prev")}>
              chevron_left
            </span>
            <span id="next" className="material-symbols-rounded"onClick={() => handleIconClick("next")}>
              chevron_right
            </span>
          </div>
        </header>
        <div className="calendar">
          <ul className="weeks">
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
          </ul>
          {daysTag}
        </div>
      </div>
    </body>
  );
};

export default Calendar;