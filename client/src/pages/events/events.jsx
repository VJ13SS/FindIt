import { useContext, useState } from "react";
import "./events.css";
import { AppContext } from "../../context/AppContext";
import axios from 'axios'

export default function Events() {
  const [eventDescription, setEventDescription] = useState("");
  const [image, setImage] = useState(false);
  const {backendUrl,userDetails} = useContext(AppContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append('image',image)
    formData.append('description',eventDescription)

    const response = await axios.post(backendUrl  + '/api/shop/add-event',formData,{headers:{token:userDetails.token}})
    console.log(response.data)
    setImage(false)
    setEventDescription('')
  }

  return (
    <div className="events">
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
        <textarea name="" placeholder="Event Description : " id="" required onChange={(e) => setEventDescription(e.target.value)} value={eventDescription}/>
        <button onClick={(e) =>submitHandler(e)}>Add Event</button>
      </form>
    </div>
  );
}
