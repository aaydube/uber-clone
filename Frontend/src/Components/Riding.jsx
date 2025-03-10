import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Clock, MapPin, User, X, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Map from "../Components/Map"

const Riding = () => {
  const location = useLocation()
  const {ride} = location.state || {}


  return (
    <div className="bg-white min-h-screen relative">
      <Map/>
      {/* Ride Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg p-6 z-10">
        <div className="w-16 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
        
        {/* Ride Info */}
        <div className="space-y-4 mb-6">
          
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <div className="h-4 w-4 rounded-full bg-black"></div>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">DESTINATION</p>
              <p className="text-sm text-black">{ride?.destination}</p>
            </div>
          </div>
        </div>
        
        
        {/* Ride Stats */}
        <div className="grid grid-cols-3 gap-4 ">
          <div className="bg-gray-50 p-3 rounded-xl text-center">
            <p className="text-xs text-gray-500 mb-1">FARE</p>
            <p className="font-semibold">₹{ride?.fare}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl text-center">
            <p className="text-xs text-gray-500 mb-1">DISTANCE</p>
            <p className="font-semibold">4.2 / 15.7 km</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl text-center">
            <p className="text-xs text-gray-500 mb-1">Time</p>
            <p className="font-semibold">50 mins</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Riding;