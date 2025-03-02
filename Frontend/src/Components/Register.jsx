import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const submithandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );
    if (response.status === 201) {
      const data = response.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);
      navigate("/home");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 text-black">
      <div className="absolute top-5 left-5 ">
        <img src="/uberb.png" className="w-16" alt="" />
      </div>
      <h1 className="text-2xl font-semibold mb-6">Create an account</h1>
      
      <form onSubmit={submithandler} className="w-full max-w-md">
        <div className="flex mb-4">
          <input 
            type="text" 
            required
            placeholder="First Name" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 mr-2 border border-gray-300  bg-gray-100 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          
          <input 
            type="text" 
            required
            placeholder="Last Name" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 border border-gray-300 bg-gray-100 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

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
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
        >
          Register
        </button>
        
        <p className="text-sm text-center mt-4">
          Already have an account? 
          <Link 
            to="/login"
            className="text-black font-semibold hover:underline ml-1"
          >
            Sign in
          </Link>
        </p>
      </form>
      <div className="text-xs text-gray-500 mt-6 text-center">
        <p className='leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
          Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  );
}