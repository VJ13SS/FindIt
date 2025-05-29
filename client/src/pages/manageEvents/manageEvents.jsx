import { useContext, useEffect, useState } from "react";
import "./manageEvents.css";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

export default function ManageEvents() {
  const { userDetails, backendUrl } = useContext(AppContext);
  const [shopEvents, setShopEvents] = useState([]);

  const getEvents = async () => {
    const response = await axios.get(backendUrl + "/api/shop/get-events", {
      headers: { token: userDetails.token },
    });

    if (response.data.success) {
      setShopEvents(response.data.events);
    } else {
      console.log(response.data.message);
    }
  };

  const changeEventStatus = async (id, status) => {
    const response = await axios.post(
      backendUrl + "/api/shop/update-event-status",
      {
        event_id: id,
        status: status,
      }
    );

    console.log(response.data.message);

    getEvents();
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="manage-events">
      <span>All Events</span>

      <div className="events-list">
        <div className="event-header events-list-format">
          <span>Image</span>
          <span>Event Description</span>
          <span>Status</span>
        </div>

        {shopEvents.map((event, indx) => (
          <div className="event events-list-format" key={indx}>
            <img src={backendUrl + "/files/" + event.image} alt="" />
            <p>{event.description}</p>

            <div className="event-status-container">
              <span
                className={`${
                  event.status === "Visible" ? "visible" : "hidden"
                }`}
              >
                {event.status}
              </span>
              <div className="event-options">
                <span
                  className="visible"
                  onClick={() => changeEventStatus(event._id, "Visible")}
                >
                  Show Event
                </span>
                <span
                  className="hidden"
                  onClick={() => changeEventStatus(event._id, "Hidden")}
                >
                  Hide Event
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
