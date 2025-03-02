import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

export default function DriverRegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const submithandler = async (e) => {
    e.preventDefault();
    const newDriver = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: parseInt(vehicleCapacity, 10),
        vehicleType,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/drivers/register`,
      newDriver
    );

    if (response.status === 201) {
      const data = response.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("driverId", data.driver._id);
      navigate("/driver-dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-black">
        <div className="absolute top-3 left-3 ">
        <img src="/uberdriver.svg" className="w-16" alt="" />
      </div>
      <form onSubmit={submithandler} className="w-full max-w-md p-3  rounded-2xl ">
      <h1 className="text-2xl font-semibold pb-3 text-center ">Sign up as a Driver</h1>
        <div className="flex space-x-3 mb-4">
          <input 
            type="text" 
            placeholder="First Name" 
            required
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)}
            className="w-1/2 p-3 border border-gray-300 bg-gray-100 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input 
            type="text" 
            placeholder="Last Name" 
            required
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)}
            className="w-1/2 p-3 border border-gray-300 bg-gray-100 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <input 
          type="email" 
          placeholder="Email" 
          required
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 bg-gray-100 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
        <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pr-10 mb-4 border border-gray-300 bg-gray-100 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-4 text-gray-600 hover:text-black"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        <div className="flex space-x-3 mb-4">
          <input 
            type="text" 
            placeholder="Vehicle Color" 
            required
            value={vehicleColor} 
            onChange={(e) => setVehicleColor(e.target.value)}
            className="w-1/2 p-3 border border-gray-300 bg-gray-100 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input 
            type="text" 
            placeholder="Vehicle Plate" 
            required
            value={vehiclePlate} 
            onChange={(e) => setVehiclePlate(e.target.value)}
            className="w-1/2 p-3 border border-gray-300 bg-gray-100 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="flex space-x-3 mb-4">
          <input 
            type="number" 
            placeholder="Vehicle Capacity" 
            required
            value={vehicleCapacity} 
            onChange={(e) => setVehicleCapacity(e.target.value)}
            className="w-1/2 p-3 border border-gray-300 bg-gray-100 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <select 
            value={vehicleType} 
            onChange={(e) => setVehicleType(e.target.value)}
            required
            className="w-1/2 p-3 border border-gray-300 bg-gray-100 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select Vehicle Type</option>
            <option value="car">Car</option>
            <option value="moto">Moto</option>
            <option value="auto">Auto</option>
          </select>
        </div>
        <button
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
        >
          Register
        </button>
        
        <p className="text-sm text-center mt-4">
          Already have an account? 
          <Link 
            to="/driver-login"
            className="text-black font-semibold hover:underline ml-1"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
