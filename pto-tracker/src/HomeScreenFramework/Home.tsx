import React from "react";
import './Home.css';
import TopBar from './HomeScreenComponents/TopBar';
import LeftList from './HomeScreenComponents/LeftList';
import Calendar from './HomeScreenComponents/MiddleCalendar';
import RightAddRequest from './HomeScreenComponents/RightAddRequest';


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


    return (
        <div id = "homePage">
            <div id = "fixedTopBar">
                <div className="TopBar"> <TopBar content=""></TopBar></div>
                <div className = "horizontal-line"></div>
            </div>
            <div className="containers" id="homeScreenContainers">
                <div className="leftList"><LeftList content={holidayRequests}></LeftList></div>
                <div className="middleCalendar"><Calendar content={holidayRequests}></Calendar></div>
                <div className="rightAddRequest"><RightAddRequest content=''></RightAddRequest></div>
            </div>
        </div>
    );
};

export default Home;