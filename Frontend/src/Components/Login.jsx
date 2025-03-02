import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import {UserDataContext} from "../context/UserContext"

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {setuser} = useContext(UserDataContext)

  const submithandler = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    );
    if (response.status === 201) {
      const data = response.data;
      setuser(data.user)
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 text-black">
      <div className="absolute top-5 left-5 ">
        <img src="/uberb.png" className="w-16" alt="" />
      </div>
      <h1 className="text-2xl font-semibold mb-6">
        What's your email and password?
      </h1>

      <div className="w-full max-w-md">
        <form onSubmit={submithandler}>
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

          <button
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            Continue
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?
          <Link to="/register" className="text-black font-semibold hover:underline ml-1">
            Sign up
          </Link>
        </p>
        <button
          className="w-full mt-4 bg-gray-200 text-black py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
          onClick={() => navigate("/driver-login")}
        >
          Sign in as Driver
        </button>
        <p className="text-xs text-gray-500 mt-6 text-center">
          By proceeding, you consent to receive calls, WhatsApp, or SMS messages from Uber and its affiliates.
        </p>
      </div>
    </div>
  );
}
