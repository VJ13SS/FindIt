import { useState } from 'react'
import './addItems.css'

export default function AddItems(){
    const [image,setImage]  = useState(false)

    return(
        <div className="add-items">
            <form action="">
                <label htmlFor="product-image">
                    <img src = {image ? URL.createObjectURL:'/Images/add_icon_white.png'} alt="" />
                </label>
                <input type="file" id='product-image' required hidden />
            </form>
        </div>
    )
}