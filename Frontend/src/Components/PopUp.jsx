import React, { useState } from 'react';
import {User} from 'lucide-react'

const RideRequestPopup = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState('');

  const handleAccept = () => {
    setShowOTP(true);
  };

  const handleIgnore = () => {
    setShowPopup(false);
  };

  const verifyOTP = () => {
    // Add OTP verification logic here
    console.log('Verifying OTP:', otp);
    setShowOTP(false);
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-end sm:items-center justify-center p-4 z-50">
      <div className="bg-white  shadow-zinc-400 shadow-2xl  rounded-lg w-full max-w-md animate-slide-up">
        <div className="p-4">
          {!showOTP ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 overflow-hidden">
                  <User/>
                </div>
                <div>
                  <h3 className="font-semibold">Aayush</h3>
                  <div className="flex space-x-2">
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded">GooglePay</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">Discount</span>
                  </div>
                </div>
                <div className="ml-auto">
                  <p className="font-semibold">₹205.00</p>
                  <p className="text-sm text-gray-500">2.2 km</p>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">PICK UP</p>
                  <p className="font-medium">7958 Swift Village</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">DROP OFF</p>
                  <p className="font-medium">105 William St, Chicago, US</p>
                </div>
              </div>

              <div className="flex space-x-3 pt-2">
                <button 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={handleIgnore}
                >
                  Ignore
                </button>
                <button 
                  className="flex-1 px-4 py-2 bg-black text-white hover:bg-zinc-800  rounded-lg transition-colors"
                  onClick={handleAccept}
                >
                  Accept
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Enter Verification Code</h3>
              <p className="text-sm text-gray-500">Please enter the OTP sent to your registered number</p>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                maxLength={6}
              />
              <button 
                className="w-full px-4 py-2 bg-black hover:bg-zinc-800 text-white  rounded-lg transition-colors"
                onClick={verifyOTP}
              >
                Verify OTP
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RideRequestPopup;