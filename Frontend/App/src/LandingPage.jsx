import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const Navigate = useNavigate();
  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-white to-[#fdf1e5] flex flex-col">
      {/* Header */}
      <div className="text-center pt-40 md:pt-12">
        <h2 className="text-8xl font-bold text-gray-700 mb-2">Zenvio</h2>
        <p className="text-gray-500 text-lg mb-12 max-w-md mx-auto">
          A platform to showcase and sell your product worldwide
        </p>
      </div>

      {/* Middle content */}
      <div className="flex-grow flex items-center justify-center px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl">
          {/* Seller Section */}
          <div className="bg-[#fdf1e5] p-10 rounded-2xl flex flex-col items-center text-center shadow w-full">
            <h2 className="text-2xl font-bold text-black mb-2">
              Want to sell your products?
            </h2>
            <p className="text-lg font-semibold mb-6 text-gray-700">Sign up as seller</p>
            <button className="bg-gray-700 text-white py-3 px-8 rounded-full hover:!bg-gray-700 transition" onClick={()=>{Navigate('/signupasseller')}}>
              Sign up
            </button>
          </div>

          {/* Customer Section */}
          <div className="bg-white p-10 rounded-2xl flex flex-col items-center text-center shadow w-full">
            <h2 className="text-2xl font-bold text-black mb-2">
              Want to buy products?
            </h2>
            <p className="text-lg font-semibold mb-6 text-gray-700">Sign up as customer</p>
            <button className="bg-gray-700 text-white py-3 px-8 rounded-full hover:!bg-gray-700 transition" onClick={()=>{Navigate('/signup')}}>
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* Footer Sign In */}
      <div className="text-center pb-12">
        <p className="text-gray-500 mb-4">Already have an account?</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center pb-6">
          <button className="bg-gray-700 text-white py-2 px-6 rounded-full hover:!bg-gray-700 transition" onClick={()=>{Navigate('/signin-seller')}} >
            Sign in as seller
          </button>
          <button className="bg-gray-700 text-white py-2 px-6 rounded-full hover:!bg-gray-700 transition" onClick={()=>{Navigate('/signin')}}>
            Sign in as customer
          </button>
        </div>
      </div>
    </div>
  );
}
