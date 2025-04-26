import React from 'react';
import '../Styles/Blobs.css'; // Import the blob animation styles

function Login() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="blob top-0 left-0 bg-purple-500"></div>
        <div className="blob bottom-0 right-0 bg-pink-500"></div>
        <div className="blob top-1/2 left-1/2 bg-blue-500"></div>
      </div>

      {/* Auth Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-10 w-full max-w-md text-white shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome to ArtVista</h2>
        <form className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded-lg bg-white/20 focus:outline-none placeholder-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded-lg bg-white/20 focus:outline-none placeholder-white"
          />
          <button className="bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-300 transition">
            Login
          </button>
          <p className="text-center text-sm">
            Don't have an account? <a href="/signup" className="underline">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
