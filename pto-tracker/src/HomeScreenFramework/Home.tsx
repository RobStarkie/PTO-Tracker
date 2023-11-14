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
                <div className="TopBar"> <TopBar content=""></TopBar></div>
                <div className = "horizontal-line"></div>
            </div>
            <div className="containers" id="homeScreenContainers">
                <div className="leftList"><LeftList content=''></LeftList></div>
                <div className="middleCalendar"><Calendar></Calendar></div>
                <div className="rightAddRequest"><RightAddRequest content=''></RightAddRequest></div>
            </div>
        </div>
    );
};

export default Home;