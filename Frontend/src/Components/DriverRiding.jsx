import React from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Map from "../Components/Map"

const DriverRiding = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const {Ride} = location.state || {}

  const endride = async()=>{
    navigate("/driver-dashboard")
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {rideId:Ride._id}, {
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`
      }
    })
  }

  return (
    <div className="bg-white min-h-screen relative">
        <Map/>
      {/* Ride Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg p-6 z-10">
        <div className="w-16 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
        
        {/* Ride Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-3 rounded-xl text-center">
            <p className="text-xs text-gray-500 mb-1">FARE</p>
            <p className="font-semibold">₹{Ride?.fare}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl text-center">
            <p className="text-xs text-gray-500 mb-1">DISTANCE</p>
            <p className="font-semibold">4.2 / 15.7 km</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl text-center">
            <p className="text-xs text-gray-500 mb-1">Time</p>
            <p className="font-semibold">50 mins</p>
          </div>
        </div>
        
        {/* Emergency Button */}
        <button onClick={endride} className="flex items-center justify-center gap-2 w-full py-3 bg-red-50 text-red-600 rounded-xl border border-red-200">
          <span className="font-medium">End Ride</span>
        </button>
      </div>
    </div>
  );
};

export default DriverRiding;