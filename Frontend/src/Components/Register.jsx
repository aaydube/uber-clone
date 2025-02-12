import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black px-6 text-white">
      <h1 className="text-2xl font-semibold mb-6">Create an account</h1>
      
      <div className="w-full max-w-md">
        <div className="flex mb-4">
          <input 
            type="text" 
            placeholder="First Name" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 mr-2 border border-gray-700 bg-zinc-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
          
          <input 
            type="text" 
            placeholder="Last Name" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 border border-gray-700 bg-zinc-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
        </div>

        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-700 bg-zinc-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-700 bg-zinc-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
        />
        
        <button
          className="w-full bg-zinc-100 text-black py-3 rounded-lg font-semibold hover:bg-zinc-300 transition"
        >
          Register
        </button>
        
        <p className="text-sm text-center mt-4">
          Already have an account? 
          <Link 
            to="/login"
            className="text-blue-400 hover:underline ml-1"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
