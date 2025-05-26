import { useContext } from 'react'
import './eventCard.css'
import { AppContext } from '../../context/AppContext'

export default function EventCard ({event}){

    const {backendUrl} = useContext(AppContext)
    return(
        <div className="event-card">
            <img src={backendUrl + '/files/' + event.image} alt="" />
            <p>{event.description}</p>
        </div>
    )
}