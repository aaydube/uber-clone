import React from 'react'

const Map = () => {
  return (
      <div className="flex-1 bg-gray-100">
        <div className="w-full h-full bg-white">
          <div className="w-full h-full relative">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-6 h-10 bg-gray-300 transform -rotate-12"
                style={{
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default Map
