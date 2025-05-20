import { Outlet, useNavigate } from "react-router-dom";
import "./dashboard.css";
import { useEffect, useState } from "react";

export default function Dashboard() {

    const navigate = useNavigate()
    const [currentOption,setCurrentOption] = useState('add')

    const addHandler = () =>{
        setCurrentOption('add')
        navigate('/dashboard/add-items')
    }

    const manageItemsHandler = () =>{
        setCurrentOption('manage')
        navigate('/dashboard/manage-items')
    }

    const bookingsHandler = () =>{
        setCurrentOption('bookings')
        navigate('/dashboard/booking-orders')
    }

    

    useEffect(() => {
      navigate('/dashboard/add-items')
    },[])


  return (
    <div className="dashboard">
      <div className="dashboard-left">
        <div className={`dashboard-icon ${currentOption === 'add' ? 'active-option':""}`} onClick={addHandler}>Add Items</div>
        <div className={`dashboard-icon ${currentOption === 'manage' ? 'active-option':""}`}onClick={manageItemsHandler}>Manage Items</div>
        <div className={`dashboard-icon ${currentOption === 'bookings' ? 'active-option':""}`} onClick={bookingsHandler}>Bookings</div>
      </div>
      <div className="dashboard-right">
        <Outlet />
      </div>
    </div>
  );
}
