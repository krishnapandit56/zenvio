import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SigninAsSeller() {
  const Navigate=useNavigate()

  const [username,setusername]=useState('')
  const [password,setpassword]=useState('')

  //=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/
  async function signin(e){
    e.preventDefault()
    const result = await fetch('https://zenvio-h5be.onrender.com/signinasseller',{
      method:'POST',
      body:JSON.stringify({username,password}),
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      }
    })
    const r = await result.json()
   if (r.statuscode === 1) {
  localStorage.setItem("username", username);   // ✅ store logged-in username
  Navigate('/home-seller');
}

    else{
      console.log('user not found !!')
    }
  }

  //=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/
  return (
    <div className="min-h-screen w-screen bg-[#DDDAD0] flex justify-center px-4 py-10">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
        <h1
          className="text-4xl font-bold mb-10 text-center"
          style={{ color: "#57564F" }}
        >
          Zenvio
        </h1>

        <form className="space-y-6" onSubmit={signin}>
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block mb-2 font-semibold text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              required
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#57564F]"
              onChange={(e)=>{setusername(e.target.value)}}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#57564F]"
              onChange={(e)=>{setpassword(e.target.value)}}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#57564F] text-white font-bold py-3 rounded-md hover:!bg-gray-600 transition-colors"
          >
            Sign In
          </button>
        </form>

        {/* Link to Signup */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#57564F] font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
