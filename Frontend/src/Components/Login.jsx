import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { Eye, EyeOff } from "lucide-react";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const submithandler = async (e)=>{
    e.preventDefault()
    const userData = {
      email,
      password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
    if(response.status === 201){
      const data = response.data
      localStorage.setItem("token", data.token)
      navigate("/home")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black px-6 text-white">
      <h1 className="text-2xl font-semibold mb-6">What's your email and password?</h1>
      
      <div className="w-full max-w-md">
        <form onSubmit={submithandler}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border  border-gray-700 bg-zinc-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
        />
        
        <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 pr-10 mb-4 border relative border-gray-700 bg-zinc-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
      />
       <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-10 transform translate-y-4 text-gray-400 hover:text-white"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
        
        <button
          className="w-full bg-zinc-100 text-black py-3 rounded-lg font-semibold hover:bg-zinc-300 transition"
        >
          Continue
        </button>
        </form>
        
        <p className="text-sm text-center mt-4">
          Don't have an account? 
          <Link 
            to="/register" 
            className="text-blue-400 hover:underline ml-1"
          >
            Sign up
          </Link>
        </p>
        <p className="text-xs text-gray-400 mt-6 text-center">
          By proceeding, you consent to receive calls, WhatsApp, or SMS messages from Uber and its affiliates.
        </p>
      </div>
    </div>
  );
}