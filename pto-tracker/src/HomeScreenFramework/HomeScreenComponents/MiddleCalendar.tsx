import React, { useEffect, useState } from 'react';
import './MiddleCalendar.css'

const Calendar: React.FC = () => {
    const [currYear, setCurrYear] = useState(new Date().getFullYear());
    const [currMonth, setCurrMonth] = useState(new Date().getMonth());
    const [daysTag, setDaysTag] = useState<JSX.Element | null>(null);
    const [currentDate, setCurrentDate] = useState<string>('');
    const [prevNextIcon, setPrevNextIcon] = useState<NodeListOf<HTMLSpanElement> | null>(null);

    const handleIconClick = (iconId: string) => {
    setCurrMonth((prevMonth) =>
        iconId === 'prev' ? prevMonth - 1 : prevMonth + 1
    );

    if (currMonth < 0 || currMonth > 11) {
        const date = new Date(currYear, currMonth, new Date().getDate());
        setCurrYear(date.getFullYear());
        setCurrMonth(date.getMonth());
    } else {
        setCurrYear(new Date().getFullYear());
        setCurrMonth(new Date().getMonth());
    }
    };
  
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
        let isToday =
          i === date.getDate() &&
          currMonth === new Date().getMonth() &&
          currYear === new Date().getFullYear()
            ? 'active'
            : '';
        liTag += `<li class="${isToday}">${i}</li>`;
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
            <span id="prev" className="material-symbols-rounded">
              chevron_left
            </span>
            <span id="next" className="material-symbols-rounded">
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