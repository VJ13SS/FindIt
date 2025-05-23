import { Outlet, useNavigate } from "react-router-dom";
import "./dashboard.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

export default function Dashboard() {

    const navigate = useNavigate()
    const {dashBoardOption,setDashBoardOption} = useContext(AppContext)

    const addHandler = () =>{
        setDashBoardOption('add')
        navigate('/dashboard/add-items')
    }

    const manageItemsHandler = () =>{
        setDashBoardOption('manage')
        navigate('/dashboard/manage-items')
    }

    const bookingsHandler = () =>{
        setDashBoardOption('bookings')
        navigate('/dashboard/booking-orders')
    }

    const eventsHandler = () =>{
      setDashBoardOption('events')
      navigate('/dashboard/events')
  }
    

    useEffect(() => {
      navigate('/dashboard/add-items')
    },[])


  return (
    <div className="dashboard">
      <div className="dashboard-left">
        <div className={`dashboard-icon ${dashBoardOption === 'add' ? 'active-option':""}`} onClick={addHandler}>Add Items</div>
        <div className={`dashboard-icon ${dashBoardOption === 'manage' ? 'active-option':""}`}onClick={manageItemsHandler}>Manage Items</div>
        <div className={`dashboard-icon ${dashBoardOption === 'bookings' ? 'active-option':""}`} onClick={bookingsHandler}>Bookings</div>
        <div className={`dashboard-icon ${dashBoardOption === 'events' ? 'active-option':""}`} onClick={eventsHandler}>Events</div>
      </div>
      <div className="dashboard-right">
        <Outlet />
      </div>
    </div>
  );
}
