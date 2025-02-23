import React from 'react';
import { Clock, Navigation, Receipt, User } from 'lucide-react';
import Map from './Map';
import RideRequestPopup from './PopUp';

const DriverDashboard = () => {
  const driverData = {
    name: "Screw Driver",
    level: "Basic level",
    earnings: 325.00,
    hoursOnline: 10.2,
    totalDistance: 30,
    totalJobs: 20
  };

  return (
    <div className="relative h-screen w-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white">
      <div className=" flex justify-between w-full">
        <img src="/uberb.png" className="h-7" alt="Uber Logo" />
      </div>
      </div>

      {/* Map Area */}
      <div className="flex flex-col h-[60vh]  w-full">
        <Map/>
      </div>
      <RideRequestPopup/>

      {/* Driver Info Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg p-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full flex justify-center items-center bg-gray-200 overflow-hidden">
            <User/>
          </div>
          <div>
            <div className="font-semibold">{driverData.name}</div>
            <div className="text-gray-500 text-sm">{driverData.level}</div>
          </div>
          <div className="ml-auto">
            <div className="font-semibold">₹{driverData.earnings.toFixed(2)}</div>
            <div className="text-gray-500 text-sm text-right">Earned</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 bg-zinc-200 rounded-xl p-4">
          <div className="text-center">
            <Clock className="w-6 h-6 mx-auto mb-1" />
            <div className="font-semibold">{driverData.hoursOnline}</div>
            <div className="text-xs text-gray-700 uppercase">Hours Online</div>
          </div>
          <div className="text-center">
            <Navigation className="w-6 h-6 mx-auto mb-1" />
            <div className="font-semibold">{driverData.totalDistance} KM</div>
            <div className="text-xs text-gray-700 uppercase">Total Distance</div>
          </div>
          <div className="text-center">
            <Receipt className="w-6 h-6 mx-auto mb-
            1" />
            <div className="font-semibold">{driverData.totalJobs}</div>
            <div className="text-xs text-gray-700 uppercase">Total Jobs</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;