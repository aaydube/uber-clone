import React, { useContext, useEffect, useState } from 'react';
import Map from './Map';
import axios from 'axios'
import {SocketContext} from "./SocketContext"
import LocationPanel from './LocationPanel';
import LocationInput from './LocationInput';
import LocationSelection from './LocationSelection';
import RideSelection from './RideSelection';
import RideConfirm from './RideConfirm';
import { useNavigate } from 'react-router-dom';

const UberInterface = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedRide, setSelectedRide] = useState(null);
  const [locations, setlocations] = useState([])
  const [origin, setorigin] = useState("")
  const [destination, setdestination] = useState("")
  const [activeField, setactiveField] = useState("")
  const navigate = useNavigate()
  const [Fare, setFare] = useState([])
  const [Ride, setRide] = useState("")
  const [lookingForDriver, setLookingForDriver] = useState(false);
  const {socket} = useContext(SocketContext)
  
  useEffect(() => {
   socket.emit("join", {userId:localStorage.getItem("userId"), userType:"user"} )
  }, [])

  socket.on("ride-accepted",(ride)=>{
    setRide(ride)
  })

  socket.on("ride-started",(ride)=>{
    navigate("/riding", {state:{ride}})
  })

  socket.on("ride-ended",(ride)=>{
    navigate("/home")
  })
  
  const originhandler = async(e)=>{
    setorigin(e.target.value)
    const response  = await axios.post(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${origin}`)
    setlocations(response.data)
  }
  const desthandler = async(e)=>{
    setdestination(e.target.value)
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${destination}`)
    setlocations(response.data)
  }
  
  const farehandler = async()=>{
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/get-fare?pickup=${origin}&destination=${destination}`)
    setFare(response.data)
  }
  const confirmride = async()=>{
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{pickup: origin, destination, vehicleType: selectedRide.type}, {headers:  {
      Authorization: `Bearer ${localStorage.getItem('token')}`
  }})
  }

  return (
    <div className="h-screen justify-center overflow-hidden w-full flex flex-col relative bg-white text-black">
      {/* Header */}
      <div onClick={() => setIsExpanded(false)} className="p-4 absolute top-0 left-52 z-10 flex justify-between w-full">
        <img src="/uberb.png" className="h-7" alt="Uber Logo" />
      </div>

      {/* Map Section */}
      <div className='h-full overflow-hidden w-full'>
      <Map/>
      </div>

      {/* Bottom Sheet */}
      <div 
        className={`bg-white border-2  border-zinc-200 rounded-t-3xl shadow-lg p-6 absolute w-full transition-all duration-300 ease-in-out ${
          isExpanded ? 'h-[93%] bottom-0' : selectedLocation ? "h-[70%] bottom-0" : 'h-56 bottom-0'
        }`}
      >
        {isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-500 rounded-full"
          />
        )}

        {
          Ride ? <RideConfirm Ride={Ride} /> :
        lookingForDriver ? (
          <div className="flex flex-col items-center  h-full space-y-4">
            <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-8 h-8 animate-spin"></div>
            <img src={`${selectedRide.image}`} className='w-28 pt-20' alt="" />
            <h2 className="text-2xl font-semibold">Looking for a driver...</h2>
            <p className="text-gray-600">We are finding the best ride for you.</p>
          </div>
        ) : selectedRide ? <RideSelection
          setSelectedRide={setSelectedRide}
          selectedRide={selectedRide}
          confirmride={confirmride}
          setLookingForDriver={setLookingForDriver}
          destination={destination}
          origin={origin}
        />  : (
          <>
            {/* Location Selection */}
            {selectedLocation ? <LocationSelection
            setSelectedLocation={setSelectedLocation}
            setSelectedRide={setSelectedRide}
            selectedRide={selectedRide}
            Fare={Fare}
             />
              :
              <h2 className="text-2xl font-semibold mb-4">Find a trip</h2>
            }
          </>
        )}

        {/* Location Inputs */}
        {!selectedLocation && !selectedRide && <LocationInput 
        setIsExpanded={setIsExpanded}
        setactiveField={setactiveField}
        originhandler={originhandler}
        farehandler={farehandler}
        desthandler={desthandler}
        origin={origin}
        destination={destination}
        setSelectedLocation={setSelectedLocation} /> }

        {/* Locations List */}
        {isExpanded && !selectedLocation && <LocationPanel
         locations={locations}
         setorigin={setorigin}
         activeField={activeField}
         setdestination={setdestination}
         setlocations={setlocations}
          />}
      </div>
    </div>
  );
};

export default UberInterface;
