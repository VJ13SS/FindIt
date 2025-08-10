# FindIt

FindIt is a MERN stack web application that connects local shops with customers.  
Shops can register, list products, post discount events, and manage bookings.  
Users can search for shops, view product availability, and place bookings with real-time status tracking.

## Features

- **Shop Registration & Login** – Shops can sign up and manage their profile.
- **Product Management** – Add, edit, or remove products; mark availability and toggle visibility.
- **Discount Events** – Shops can post ongoing or upcoming discount events.
- **User Browsing & Search** – Search by shop name, product name, address, or location.
- **Booking System** – Users can book products; shops can accept or reject orders.
- **Order Management** – Shops can manage incoming bookings and update their status.
- **Booking Tracking** – Users can track the status of their orders.
- **Role-Based Access** – Separate features for shops and customers.

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, bcrypt
- **Deployment:** Vercel

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/VJ13SS/findit.git
2. Install dependencies:

   ```bash
   # Server
   cd server
   npm install

   # Client
   cd ../client
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the `server` folder and set:

   ```
   PORT=PORT_NUMBER
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. Run the app:

   ```bash
   # Start backend
   cd server
   npm run dev

   # Start frontend (in another terminal)
   cd client
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## License

This project is licensed under the MIT License.