import React, { useContext, useEffect, useState } from 'react';
import { Clock, MapPin, ArrowLeft } from 'lucide-react';
import Map from './Map';
import axios from 'axios'
import { UserDataContext } from '../context/UserContext';
import {SocketContext} from "../context/SocketContext"
import LocationPanel from './LocationPanel';

const UberInterface = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedRide, setSelectedRide] = useState(null);
  const [locations, setlocations] = useState([])
  const [origin, setorigin] = useState("")
  const [destination, setdestination] = useState("")
  const [activeField, setactiveField] = useState("")
  const [Fare, setFare] = useState([])
  const [lookingForDriver, setLookingForDriver] = useState(false);
  const {user} = useContext(UserDataContext)
  const {socket} = useContext(SocketContext)
  
  useEffect(() => {
   socket.emit("join", {userId:localStorage.getItem("userId"), userType:"user"} )
  }, [])

  socket.on("ride-accepted",(ride)=>{
    console.log(ride)
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
    // console.log(response)
  }
  
  const rides = [
    { name: "UberGo", capacity: 4, type: "car" , time: "2 mins away", price: Fare.car , description: "Affordable, compact rides", image: "/ubergo.png" },
    { name: "Moto", capacity: 1, type: "moto" ,time: "3 mins away", price: Fare.moto, description: "Affordable motorcycle rides", image: "/moto.png" },
    { name: "Premier", capacity: 4,type: "premier" , time: "4 mins away", price: Fare.premier , description: "Comfortable sedans, top-quality drivers", image: "/premier.png" },
    { name: "UberAuto", capacity: 3,type: "auto" , time: "2 mins away", price: Fare.auto, description: "Affordable auto rides", image: "/uberauto.png" },
  ];

  return (
    <div className="h-screen justify-center overflow-hidden w-full flex flex-col relative bg-white text-black">
      {/* Header */}
      <div onClick={() => setIsExpanded(false)} className="p-4 absolute top-0 left-52 z-10 flex justify-between w-full">
        <img src="/uberb.png" className="h-7" alt="Uber Logo" />
      </div>

      {/* Map Section */}
      {/* <div className='h-full overflow-hidden w-full'>
      <Map/>
      </div> */}

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
        lookingForDriver ? (
          <div className="flex flex-col items-center  h-full space-y-4">
            <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-8 h-8 animate-spin"></div>
            <img src={`${selectedRide.image}`} className='w-28 pt-20' alt="" />
            <h2 className="text-2xl font-semibold">Looking for a driver...</h2>
            <p className="text-gray-600">We are finding the best ride for you.</p>
          </div>
        ) : selectedRide ? (
          <div className="space-y-6">
            {/* Back Button */}
            <button
              onClick={() => setSelectedRide(null)} // Resets selected ride
              className="absolute top-2 left-4 p-2 text-black bg-gray-200 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Confirm Ride Section */}
            <div className="p-2 rounded-xl w-full max-w-md mx-auto">
      <h2 className="text-2xl text-center font-semibold">Confirm Your Ride</h2>

      <div className="flex flex-col items-center gap-4 mt-4">
        <img src={selectedRide.image} alt={selectedRide} className="h-28" />

        <div className="text-center">
          <h3 className="font-semibold text-2xl pb-2">{selectedRide.name}</h3>
          <p className="text-gray-600 text-sm pb-1 ">From: {origin}</p>
          <p className="text-gray-600 text-sm pb-1">To: {destination}</p>
          <p className="text-sm text-gray-500 pb-5">Arrival in {selectedRide.time}</p>
        </div>
      </div>


      <div className="flex justify-between  items-center ">
          <p className="font-semibold text-2xl bg-gray-100 rounded-lg p-3 text-black">₹{selectedRide.price}</p>
        <button
          onClick={() => {
            setLookingForDriver(true)
            confirmride()
          }}
          className="px-14 py-4 font-semibold bg-black text-white rounded-lg"
        >
          Confirm Ride
        </button>
      </div>
    </div>
          </div>
        ) : (
          <>
            {/* Location Selection */}
            {selectedLocation ?
              <>
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="absolute top-2 left-4 p-2 text-black bg-gray-200 rounded-full"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="mt-4">
                  {rides.map((ride, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedRide(ride)}
                      className={`flex items-center justify-between p-4 rounded-lg active:border-black border-2 cursor-pointer ${selectedRide === ride.name ? "border-black" : "border-gray-300"} mb-2`}
                    >
                      <div className="flex items-center space-x-4">
                        <img src={ride.image} alt={ride.name} className="h-12" />
                        <div>
                          <h3 className="font-semibold">{ride.name}</h3>
                          <p className="text-gray-600 text-sm">{ride.time}</p>
                          <p className="text-gray-600 text-xs">{ride.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{ride.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
              :
              <h2 className="text-2xl font-semibold mb-4">Find a trip</h2>
            }
          </>
        )}

        {/* Location Inputs */}
        {!selectedLocation && !selectedRide && (
          <>
            <div className="space-y-3 ">
              <div className="flex items-center space-x-4 bg-gray-200 p-4 rounded-lg">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-2 h-2 rounded-full bg-black"></div>
                  <div className="w-0.5 h-8 bg-gray-400"></div>
                  <div className="w-2 h-2 border-2 border-black rounded-full"></div>
                </div>
                <div className="flex-1 space-y-4">
                  <input
                    type="text"
                    placeholder="Add a pick-up location"
                    className="w-full bg-transparent text-black mb-5 text-lg placeholder-gray-500 focus:outline-none"
                    onFocus={() => {
                      setIsExpanded(true)
                      setactiveField("origin")
                    }}
                    value={origin}
                    onChange={(e)=>originhandler(e)}
                  />
                  <input
                    type="text"
                    placeholder="Enter your destination"
                    className="w-full bg-transparent text-black text-lg placeholder-gray-500 focus:outline-none"
                    value={destination}
                    onFocus={() => {
                      setIsExpanded(true)
                      setactiveField("destination")
                    }}
                    onChange={(e)=>desthandler(e)}
                  />
                </div>
              </div>
                  {origin && destination ? <button onClick={()=>{
                    farehandler()
                    setSelectedLocation(origin, destination)
                    setIsExpanded(false)
                  }} className='bg-black p-2 text-white rounded-md'>Submit</button> : ""}
            </div>
          </>
        )}

        {/* Locations List */}
        {isExpanded && !selectedLocation && <LocationPanel locations={locations} />}
      </div>
    </div>
  );
};

export default UberInterface;
