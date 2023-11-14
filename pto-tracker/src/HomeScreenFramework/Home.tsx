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
    return (
        <div id = "homePage">
            <div id = "fixedTopBar">
                <TopBar content=""></TopBar>
                <div className = "horizontal-line"></div>
            </div>
            <ul className="horizontal-list">
                <li><LeftList content=''></LeftList></li>
                <li><Calendar></Calendar></li>
                <li><RightAddRequest content=''></RightAddRequest></li>
            </ul>
        </div>
    );
};

export default Home;