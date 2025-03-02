import React from "react";
import { ArrowLeft } from 'lucide-react';

const LocationSelection = ({ setSelectedLocation, setSelectedRide, selectedRide, Fare }) => {
    const rides = [
        { name: "UberGo", capacity: 4, type: "car" , time: "2 mins away", price: Fare.car , description: "Affordable, compact rides", image: "/ubergo.png" },
        { name: "Moto", capacity: 1, type: "moto" ,time: "3 mins away", price: Fare.moto, description: "Affordable motorcycle rides", image: "/moto.png" },
        { name: "Premier", capacity: 4,type: "premier" , time: "4 mins away", price: Fare.premier , description: "Comfortable sedans, top-quality drivers", image: "/premier.png" },
        { name: "UberAuto", capacity: 3,type: "auto" , time: "2 mins away", price: Fare.auto, description: "Affordable auto rides", image: "/uberauto.png" },
      ];

  return (
    <div>
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
              className={`flex items-center justify-between p-4 rounded-lg active:border-black border-2 cursor-pointer ${
                selectedRide === ride.name ? "border-black" : "border-gray-300"
              } mb-2`}
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
    </div>
  );
};

export default LocationSelection;
