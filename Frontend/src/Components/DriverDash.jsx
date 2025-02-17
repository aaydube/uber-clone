import React, { useState, useEffect } from "react";
import Map from '../Components/Map'

const DriverDashboard = () => {
  const [status, setStatus] = useState("Finding ride requests");
  const [earnings, setEarnings] = useState(12.2);
  const [onlineTime, setOnlineTime] = useState("1hr 12min");
  const [rides, setRides] = useState(2);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setStatus("Finding ride requests...");
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="relative flex h-screen w-full bg-gray-100">
       <div onClick={() => setIsExpanded(false)} className="p-4 absolute top-0 left-0 z-10 flex justify-between w-full">
        <img src="/uberb.png" className="h-7" alt="Uber Logo" />
        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
      </div>
     <Map/>

      {/* Bottom Panel */}
      <div className="absolute bottom-0 left-0 w-full bg-white border border-gray-300  p-4 rounded-t-2xl">
        <div className="flex justify-around border-b pb-2 mb-2">
          <button className="flex-1 text-center py-2 font-semibold border-b-2 border-black">Drive</button>
          <button className="flex-1 text-center py-2 text-gray-500">Earnings</button>
        </div>
        <p className="text-center text-gray-700">{status}</p>
        <div className="flex justify-around mt-4 text-center">
          <div>
            <p className="text-xl font-semibold">${earnings}</p>
            <p className="text-gray-500 text-sm">Earnings</p>
          </div>
          <div>
            <p className="text-xl font-semibold">{onlineTime}</p>
            <p className="text-gray-500 text-sm">Online</p>
          </div>
          <div>
            <p className="text-xl font-semibold">{rides}</p>
            <p className="text-gray-500 text-sm">Rides</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;