import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import MainPageD from './MainPage/MainPageD';
import ViewPost from './MainPage/ViewPost';
import {Route } from "react-router-dom";
const MainPage = ({socket})=> {
    console.log("mainpage")
    return (
        <div className="Main-app-admin">      
        <MainPageD socket={socket}/>
        </div>
        
    )
}

export default MainPage
