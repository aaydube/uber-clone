import React, { useState, useEffect } from 'react';
import { X, Phone, Car, MapPin, User } from 'lucide-react';

const RideConfirm = ({Ride}) => {
  const [visible, setVisible] = useState(true);

  const closePopup = () => {
    setVisible(false);
  };
  
  if (!visible) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm  z-50 backdrop">
      <div className="bg-white rounded-xl shadow-2xl border-gray-300 border p-4 max-w-md w-full mx-4">
        {/* Close Button - Following your theme's style */}
        <button
          onClick={closePopup}
          className=" top-13 right-2 absolute p-2 text-black bg-gray-200 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-2 rounded-xl w-full max-w-md mx-auto">
          <h2 className="text-2xl text-center font-semibold mb-6">
            Ride Accepted!
          </h2>

              <div className="flex flex-col w-full h-full bg-gray-100 p-2 rounded-xl mb-6">
                    <div className='flex items-center'>
                        <div className="w-12 h-12 rounded-full mr-2 flex justify-center items-center bg-gray-200 overflow-hidden">
                              <User/>
                            </div>
                            <div>
                              <div className="font-semibold capitalize">{Ride.driver.fullname.firstname} {Ride.driver.fullname.lastname}</div>
                            </div>
                    </div>
              <p className="text-gray-600 pt-2 pl-2 text-sm pb-1 ">Vehicle Plate: <span className='uppercase'>{Ride.driver.vehicle.plate}</span></p>
              <p className="text-sm text-gray-500 pl-2 pb-1">
                Capacity: {Ride.driver.vehicle.capacity}
              </p>
            </div>

          <div className="space-y-4 my-4 bg-gray-50 p-4 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <div className="h-4 w-4 rounded-full bg-green-500"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-black">From</p>
                <p className="text-sm text-gray-600">{Ride.pickup}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <div className="h-4 w-4 rounded-full bg-black"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-black">To</p>
                <p className="text-sm text-gray-600">{Ride.destination}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">OTP</p>
              <p className="font-semibold text-2xl bg-gray-100 rounded-lg p-3 text-black">
                {Ride.otp}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Fare</p>
              <p className="font-semibold text-2xl bg-gray-100 rounded-lg p-3 text-black">
                ₹{Ride.fare}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideConfirm;