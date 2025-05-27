import { Outlet, useNavigate } from "react-router-dom";
import "./dashboard.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { dashBoardOption, setDashBoardOption } = useContext(AppContext);

  const addItemsHandler = () => {
    setDashBoardOption("add-items");
    navigate("/dashboard/add-items");
  };

  const manageItemsHandler = () => {
    setDashBoardOption("manage-items");
    navigate("/dashboard/manage-items");
  };

  const manageEventsHandler = () => {
    setDashBoardOption("manage-events");
    navigate("/dashboard/manage-events");
  };

  const manageBookingsHandler = () => {
    setDashBoardOption("manage-bookings");
    navigate("/dashboard/booking-orders");
  };

  const shopBookingsHandler = () => {
    setDashBoardOption("shop-bookings");
    navigate("/dashboard/shop-bookings");
  };

  const eventsHandler = () => {
    setDashBoardOption("add-events");
    navigate("/dashboard/add-events");
  };

  useEffect(() => {
    navigate("/dashboard/add-items");
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-left">
        <div
          className={`dashboard-icon ${
            dashBoardOption === "add-items" ? "active-option" : ""
          }`}
          onClick={addItemsHandler}
        >
          Add Items
        </div>
        <div
          className={`dashboard-icon ${
            dashBoardOption === "add-events" ? "active-option" : ""
          }`}
          onClick={eventsHandler}
        >
          Add Events
        </div>
        <div
          className={`dashboard-icon ${
            dashBoardOption === "manage-items" ? "active-option" : ""
          }`}
          onClick={manageItemsHandler}
        >
          Manage Items
        </div>
        <div
          className={`dashboard-icon ${
            dashBoardOption === "manage-events" ? "active-option" : ""
          }`}
          onClick={manageEventsHandler}
        >
          Manage Events
        </div>
        <div
          className={`dashboard-icon ${
            dashBoardOption === "manage-bookings" ? "active-option" : ""
          }`}
          onClick={manageBookingsHandler}
        >
          Manage Booking Orders
        </div>
        <div
          className={`dashboard-icon ${
            dashBoardOption === "shop-bookings" ? "active-option" : ""
          }`}
          onClick={shopBookingsHandler}
        >
          Your Bookings
        </div>
      </div>
      <div className="dashboard-right">
        <Outlet />
      </div>
    </div>
  );
}
