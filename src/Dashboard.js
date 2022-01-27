import React from "react";
import './Dashboard.css'
import SideBar from "./SideBar";
import Body from "./Body";
import Footer from "./Footer";

export const Dashboard = ({spotify}) => {

    return (
        <div className="dashboard">
            <div className="dashboard_body">
                {<SideBar spotify={spotify}/>}
                <Body spotify={spotify}/>
            </div>
            <Footer spotify={spotify}/>
        </div>
    )
}