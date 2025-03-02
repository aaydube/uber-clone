import React, { useContext, useEffect, useState } from 'react';
import { Clock, Navigation, Receipt, User, LogOut } from 'lucide-react';
import Map from './Map';
import RideRequestPopup from './PopUp';
import { SocketContext } from '../context/SocketContext';
import {DriverDataContext} from '../context/DriverContext'
import { useNavigate } from 'react-router-dom';

const DriverDashboard = () => {
    const {socket} = useContext(SocketContext)
    const navigate = useNavigate()
    const driverName = JSON.parse(localStorage.getItem("username"))
    const {driver} = useContext(DriverDataContext)
    const [newRide, setnewRide] = useState()

  useEffect(() => {
   socket.emit("join", {userType:"driver", userId:JSON.parse(localStorage.getItem("userId"))} )

   const updateLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

            socket.emit('update-location-driver', {
                userId: driver._id,
                location: {
                    ltd: position.coords.latitude,
                    lng: position.coords.longitude
                }
              })
            })
          }
        }
        
        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()
      }, [])

  socket.on("new-user", (data)=>{
    setnewRide(data)
  })

  return (
    <div className="relative h-screen w-full bg-gray-50">

      <div onClick={()=>{
        localStorage.clear("token")
        navigate("/driver-login")
      }} className='absolute top-2 rounded-full bg-white h-10 w-10 flex items-center justify-center z-200 right-2'>
      <LogOut className='h-7 w-7 '/>
      </div>

      {/* Map Area */}
      <div className="flex flex-col h-[75vh]  w-full">
        <Map/>
      </div>
      {newRide?<RideRequestPopup Ride={newRide} />:""}

      {/* Driver Info Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg p-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full flex justify-center items-center bg-gray-200 overflow-hidden">
            <User/>
          </div>
          <div>
            <div className="font-semibold capitalize">{driverName?.firstname} {driverName?.lastname}</div>
            <div className="text-gray-500 text-sm">Basic level</div>
          </div>
          <div className="ml-auto">
            <div className="font-semibold">₹325.00</div>
            <div className="text-gray-500 text-sm text-right">Earned</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 bg-zinc-200 rounded-xl p-4">
          <div className="text-center">
            <Clock className="w-6 h-6 mx-auto mb-1" />
            <div className="font-semibold">10.2</div>
            <div className="text-xs text-gray-700 uppercase">Hours Online</div>
          </div>
          <div className="text-center">
            <Navigation className="w-6 h-6 mx-auto mb-1" />
            <div className="font-semibold">30 KM</div>
            <div className="text-xs text-gray-700 uppercase">Total Distance</div>
          </div>
          <div className="text-center">
            <Receipt className="w-6 h-6 mx-auto mb-
            1" />
            <div className="font-semibold">20</div>
            <div className="text-xs text-gray-700 uppercase">Total Jobs</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;