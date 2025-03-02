import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import {DriverDataContext} from "../context/DriverContext"

export default function DriverLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {setdriver} = useContext(DriverDataContext)

  const submithandler = async (e) => {
    e.preventDefault();
    const driverData = {
      email,
      password,
    };
    
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/drivers/login`,
      driverData
    );
    if (response.status === 201) {
      const data = response.data;
      setdriver(data.driver)
      localStorage.setItem("username", JSON.stringify(data.driver.fullname))
      localStorage.setItem("userId", JSON.stringify(data.driver._id))
      localStorage.setItem("token", data.token);
      navigate("/driver-dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 text-black">
        <div className="absolute top-3 left-3 ">
        <img src="/uberdriver.svg" className="w-16" alt="" />
      </div>
      <h1 className="text-2xl font-semibold mb-6">Login as a Driver</h1>
      
      <form onSubmit={submithandler} className="w-full max-w-md">
        <input 
          type="email" 
          placeholder="Email" 
          required
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 bg-gray-100 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            required
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
        
        <button
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Login
        </button>
        
        <p className="text-sm text-center mt-4">
          Don't have an account?
          <Link to="/driver-register" className="text-black font-semibold hover:underline ml-1">
            Sign up
          </Link>
        </p>
        <button
          className="w-full mt-4 bg-gray-200 text-black py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
          onClick={() => navigate("/login")}
        >
          Sign in as User
        </button>
      </form>
    </div>
  );
}
