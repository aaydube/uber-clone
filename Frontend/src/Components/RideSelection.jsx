import React from "react";
import { ArrowLeft } from 'lucide-react';

const RideSelection = ({
    setSelectedRide,
    selectedRide,
    confirmride,
    setLookingForDriver,
    destination,
    origin
}) => {
  return (
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
          <h2 className="text-2xl text-center font-semibold">
            Confirm Your Ride
          </h2>

          <div className="flex flex-col items-center gap-4 mt-4">
            <img src={selectedRide.image} alt={selectedRide} className="h-28" />

            <div className="text-center">
              <h3 className="font-semibold text-2xl pb-2">
                {selectedRide.name}
              </h3>
              <p className="text-gray-600 text-sm pb-1 ">From: {origin}</p>
              <p className="text-gray-600 text-sm pb-1">To: {destination}</p>
              <p className="text-sm text-gray-500 pb-5">
                Arrival in {selectedRide.time}
              </p>
            </div>
          </div>

          <div className="flex justify-between  items-center ">
            <p className="font-semibold text-2xl bg-gray-100 rounded-lg p-3 text-black">
              ₹{selectedRide.price}
            </p>
            <button
              onClick={() => {
                setLookingForDriver(true);
                confirmride();
              }}
              className="px-14 py-4 font-semibold bg-black text-white rounded-lg"
            >
              Confirm Ride
            </button>
          </div>
        </div>
      </div>
  );
};

export default RideSelection;
