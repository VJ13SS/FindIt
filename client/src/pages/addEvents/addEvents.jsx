import { useContext, useEffect, useState } from "react";
import "./addEvents.css";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

export default function AddEvents() {
  const [eventDescription, setEventDescription] = useState("");
  const [image, setImage] = useState(false);
  const { backendUrl, userDetails } = useContext(AppContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if(!image){
      alert('Upload Image')
      return
    }
    if(eventDescription.length > 50){
      alert('Event Description should be of 50 Characters')
      
      return
    }
    formData.append("image", image);
    formData.append("description", eventDescription);

    const response = await axios.post(
      backendUrl + "/api/shop/add-event",
      formData,
      { headers: { token: userDetails.token } }
    );
    alert(response.data.message);
    setImage(false);
    setEventDescription("");
  };

  return (
    <div className="add-events">
      <form action="">
        <span>Post Your Event Image</span>

        <label htmlFor="event-image">
          <img
            src={image ? URL.createObjectURL(image) : "/Images/upload_area.png"}
            alt=""
          />
        </label>
        <input
          type="file"
          id="event-image"
          name="event-img"
          required
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
        <span>Event Description</span>
        <div className="event-description">
          <span className={`event-description-header ${eventDescription.length > 50 ? 'limit-exceeded' :''}`}>{eventDescription.length}/50</span>
          <textarea
            name=""
            placeholder="Max 50 Characters : "
            id=""
            required
            onChange={(e) => setEventDescription(e.target.value)}
            value={eventDescription}
          />
        </div>

        <button onClick={(e) => submitHandler(e)}>Add Event</button>
      </form>
    </div>
  );
}
