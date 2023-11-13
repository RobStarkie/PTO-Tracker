import React, { useEffect, useState } from 'react';
import './MiddleCalendar.css'

const Calendar: React.FC = () => {

    const [currYear, setCurrYear] = useState(new Date().getFullYear());
    const [currMonth, setCurrMonth] = useState(new Date().getMonth());
    const [daysTag, setDaysTag] = useState<JSX.Element | null>(null);
    const [currentDate, setCurrentDate] = useState<string>('');

    type DateRange = [Date, Date, string];

    const dateRanges: DateRange[] = [
        [new Date('2023-10-31'), new Date('2023-11-11'), "pending"],
        [new Date('2024-01-15'), new Date('2024-01-17'), "confirmed"],
        [new Date('2023-12-01'), new Date('2023-12-04'), "confirmed"]
]

    function isDateInRange(dateToCheck: Date): string {
        var output:string = '';
        const currentDate:Date = new Date();
        if (dateToCheck.getDate() == currentDate.getDate() && dateToCheck.getMonth() == currentDate.getMonth() && dateToCheck.getFullYear() == currentDate.getFullYear()) {
            return 'active';
        }
        dateRanges.forEach(([startDate, endDate, status]) => {
            if (dateToCheck >= startDate && dateToCheck <= endDate) {
                output = status;
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