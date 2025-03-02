import React from 'react'
import { MapPin } from 'lucide-react';

const LocationPanel = ({
  locations,
  activeField,
  setorigin,
  setdestination,
  setlocations
}) => {
  return (
    <div>
        {
            locations.length > 0 ? (
                <div className="pt-5">
                  {locations.map((location, index) => (
                    <div 
                      key={index} 
                      className="w-full  flex items-center mb-2 p-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition"
                      onClick={() => {
                        if(activeField==="origin"){
                          setorigin(location)
                        }else{
                          setdestination(location)
                        }
                        setlocations([])
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
                </div>)
        }
    </div>
  )
}

export default LocationPanel
