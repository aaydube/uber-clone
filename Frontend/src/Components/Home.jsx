import React, { useState } from 'react';
import { Clock, MapPin, ArrowLeft } from 'lucide-react';
import Map from './Map';

const UberInterface = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedRide, setSelectedRide] = useState(null);
  const locations = ["New York", "H-1442, New Delhi", "Sydney"];
  // const locations = []
  const rides = [
    { name: "UberGo", capacity: 4, time: "2 mins away", price: "₹193.20", description: "Affordable, compact rides", image: "/ubergo.png" },
    { name: "Moto", capacity: 1, time: "3 mins away", price: "₹65.17", description: "Affordable motorcycle rides", image: "/moto.png" },
    { name: "Premier", capacity: 4, time: "4 mins away", price: "₹193.20", description: "Comfortable sedans, top-quality drivers", image: "/premier.png" },
    { name: "UberAuto", capacity: 3, time: "2 mins away", price: "₹118.21", description: "Affordable auto rides", image: "/uberauto.png" },
  ];
  const ride = rides.find(ride => ride.name === selectedRide)
  const currentLocation = "Your Current Location"; // Placeholder for current location
  const destination = selectedLocation || "Destination"; // If a location is selected, show it as the destination

  return (
    <div className="h-screen w-full flex flex-col relative bg-white text-black">
      {/* Header */}
      <div onClick={() => setIsExpanded(false)} className="p-4 absolute top-0 left-0 z-10 flex justify-between w-full">
        <img src="/uberb.png" className="h-7" alt="Uber Logo" />
        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
      </div>

      {/* Map Section */}
      <Map/>

      {/* Bottom Sheet */}
      <div 
        className={`bg-white border-2 border-zinc-200 rounded-t-3xl shadow-lg p-6 absolute w-full transition-all duration-300 ease-in-out ${
          isExpanded ? 'h-[93%] bottom-0' : selectedLocation ? "h-[70%] bottom-0" : 'h-56 bottom-0'
        }`}
      >
        {isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-500 rounded-full"
          />
        )}

        {/* Conditional Title */}
        {selectedRide ? (
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
        <img src={ride.image} alt={selectedRide} className="h-28" />

        <div className="text-center">
          <h3 className="font-semibold text-2xl">{selectedRide}</h3>
          <p className="text-gray-600 text-lg">From: {currentLocation}</p>
          <p className="text-gray-600 text-lg">To: {destination}</p>
          <p className="text-sm text-gray-500">Arrival in {ride.time}</p>
        </div>
      </div>


      <div className="flex justify-between items-center pt-12">
          <p className="font-semibold text-2xl bg-gray-100 rounded-lg p-3 text-black">₹100</p>
        <button
          onClick={() => alert("Ride Confirmed!")}
          className="px-16 py-4 font-semibold bg-black text-white rounded-lg"
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
                      onClick={() => setSelectedRide(ride.name)}
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
                        <p className="font-semibold">{ride.price}</p>
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
            <div className="space-y-3">
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
                    onFocus={() => setIsExpanded(true)}
                  />
                  <input
                    type="text"
                    placeholder="Enter your destination"
                    className="w-full bg-transparent text-black text-lg placeholder-gray-500 focus:outline-none"
                    onFocus={() => setIsExpanded(true)}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Locations List */}
        {isExpanded && !selectedLocation && (
          locations.length > 0 ? (
            <div className="pt-5">
              {locations.map((location, index) => (
                <div 
                  key={index} 
                  className="w-full h-12 flex items-center rounded-md p-3 cursor-pointer hover:bg-gray-200 transition"
                  onClick={() => {
                    setSelectedLocation(location);
                    setIsExpanded(false);
                  }}
                >
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <h1 className="pl-5 w-[90%] text-gray-800">{location}</h1>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="bg-gray-200 p-4 rounded-lg">
                <h3 className="font-medium">Recent Locations</h3>
                <div className="mt-2 space-y-2 text-gray-500">
                  <p>Home</p>
                  <p>Work</p>
                  <p>Gym</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UberInterface;
