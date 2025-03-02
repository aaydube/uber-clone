import React from 'react'

const LocationInput = ({
    setIsExpanded,
    setactiveField,
    originhandler,
    farehandler,
    setSelectedLocation,
    desthandler,
    origin,
    destination
}) => {
  return (
    <div>
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
    </div>
  )
}

export default LocationInput
