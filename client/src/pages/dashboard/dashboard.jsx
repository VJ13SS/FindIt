import { Outlet, useNavigate } from "react-router-dom";
import "./dashboard.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

export default function Dashboard() {

    const navigate = useNavigate()
    const {dashBoardOption,setDashBoardOption} = useContext(AppContext)

    const addHandler = () =>{
        setDashBoardOption('add-items')
        navigate('/dashboard/add-items')
    }

    const manageItemsHandler = () =>{
        setDashBoardOption('manage-items')
        navigate('/dashboard/manage-items')
    }

    const manageEventsHandler = () =>{
      setDashBoardOption('manage-events')
      navigate('/dashboard/manage-events')
  }

    const bookingsHandler = () =>{
        setDashBoardOption('bookings')
        navigate('/dashboard/booking-orders')
    }

    const eventsHandler = () =>{
      setDashBoardOption('add-events')
      navigate('/dashboard/add-events')
  }
    

    useEffect(() => {
      navigate('/dashboard/add-items')
    },[])


  return (
    <div className="dashboard">
      <div className="dashboard-left">
        <div className={`dashboard-icon ${dashBoardOption === 'add-items' ? 'active-option':""}`} onClick={addHandler}>Add Items</div>
        <div className={`dashboard-icon ${dashBoardOption === 'add-events' ? 'active-option':""}`} onClick={eventsHandler}>Add Events</div>
        <div className={`dashboard-icon ${dashBoardOption === 'manage-items' ? 'active-option':""}`}onClick={manageItemsHandler}>Manage Items</div>
        <div className={`dashboard-icon ${dashBoardOption === 'manage-events' ? 'active-option':""}`}onClick={manageEventsHandler}>Manage Events</div>
        <div className={`dashboard-icon ${dashBoardOption === 'bookings' ? 'active-option':""}`} onClick={bookingsHandler}>Bookings</div>
        
      </div>
      <div className="dashboard-right">
        <Outlet />
      </div>
    </div>
  );
}
