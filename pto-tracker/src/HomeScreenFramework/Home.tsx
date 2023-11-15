import React from "react";
import './Home.css';
import TopBar from './HomeScreenComponents/TopBar';
import LeftList from './HomeScreenComponents/LeftList';
import Calendar from './HomeScreenComponents/MiddleCalendar';
import RightAddRequest from './HomeScreenComponents/RightAddRequest';
import HolidayRemaining from './HomeScreenComponents/HolidayRemaining';
import shapes from './shapes.svg';


interface HomeProps {
    handleLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ handleLogout}) => {

    const holidayRequests  = [{
        id: 'user1',
        startDate: '2023-11-01',
        endDate: '2023-11-06',
        status: 'confirmed'
    }, {
        id: 'user1',
        startDate: '2023-12-10',
        endDate: '2023-12-12',
        status: 'pending'
    }, {
        id: 'user2',
        startDate: '2024-01-09',
        endDate: '2024-01-13',
        status: 'confirmed'
    }];

    const holidayRemaining = {
        remaining : 0,
        pending: 0,
        total: 0,
        approved: 0,
    }


    return (
        <div id = "homePage">
            <div id = "fixedTopBar">
                <TopBar handleLogout={handleLogout}></TopBar>
            </div>
            <ul className="horizontal-list">
                <li><LeftList content={holidayRequests}></LeftList></li>
                <li><Calendar content={holidayRequests}></Calendar></li>
                <li><RightAddRequest content=''></RightAddRequest></li>
            </ul>
            <div><HolidayRemaining content={holidayRemaining}></HolidayRemaining></div>
            <img src={shapes} className="background-shapes"></img>
        </div>
    );
};

export default Home;