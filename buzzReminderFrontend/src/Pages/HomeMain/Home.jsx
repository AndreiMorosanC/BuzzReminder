import { useState } from "react";
import Login from "../LoginMain/Login";
import Calendar from "../../Components/CalendarMain/Calendar";
import Menu from "../../Components/MenuMain/Menu";

const Home = ()=>{



    return(
        <div className="flex flex-row ">
            <Menu/>
            <Calendar/>

        </div>
    )
}



export default Home;