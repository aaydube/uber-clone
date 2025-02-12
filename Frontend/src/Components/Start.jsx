import { Link } from "react-router-dom";


export default function StartPage() {

  return (
    <div 
      className="flex flex-col items-center justify-between min-h-screen text-white p-6 bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566243052021-d39ace07c392?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww')" }}
    >
      <div className="flex flex-col items-center mt-auto">
        <img src="/uber.png" alt="Uber Logo" className="w-28 mb-4" />
        <p className="text-gray-400 mb-6 text-center max-w-sm">Move the way you want. Tap the button to get started.</p>
      </div>
      <Link to="/login"
        className="w-full max-w-sm px-6 py-4 bg-white text-center text-black font-semibold rounded-full shadow-lg hover:bg-gray-200 transition"
      >
        Continue
      </Link>
    </div>
  );
}
