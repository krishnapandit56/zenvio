import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Otpseller() {
  const [otp, setOtp] = useState("");
  const location = useLocation()
  const sellerdata = location.state

  const [buttontext,setbuttontext]=useState('Verify OTP')
  const [buttoncolor,setbuttoncolor]=useState('!bg-black')

  const ownername=sellerdata.ownername
  const username=sellerdata.username
  const ownerphonenumber=sellerdata.ownerphonenumber
  const email=sellerdata.email
  const password=sellerdata.password
  const storename=sellerdata.storename
  const address=sellerdata.address
  const state=sellerdata.state
  const city =sellerdata.city
  const storephonenumber=sellerdata.storephonenumber

  const handleChange = (e) => {
    const value = e.target.value;
    // allow only digits & max 6 chars
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await fetch('/signupasseller',{
        method:'post',
        body:JSON.stringify({ownername,ownerphonenumber,email,username,password,storename,city,state,storephonenumber,address,otp}),
        headers:{
            "Content-Type":"application/json"
        }
    })

    let r = await result.json()
    if(r.statuscode==0){
      setbuttontext('Wrong OTP !!')
      setbuttoncolor('!bg-red-500')
    }
    if(r.statuscode==1){
      setbuttontext('Account Created , You Can Go Back To Signin Page')
      setbuttoncolor('!bg-green-500')
    }


  };

  return (
    <div className="flex flex-col gap-3 mb-10 items-center justify-center min-h-screen w-full bg-gradient-to-r from-white to-[#fdf1e5]">
<div className="">
            <h2 className="text-gray-700 text-[120px] "><b>Zenvio</b></h2>
        </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Enter OTP
        </h2>
        <p className="text-gray-500 mb-6">
          Please enter the 6-digit OTP sent to your email.
        </p>

        <input
          type="text"
          value={otp}
          onChange={handleChange}
          maxLength={6}
          className="text-black w-full text-center tracking-widest text-2xl border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="______"
        />

        <button
          type="submit"
          className={`mt-6 w-full ${buttoncolor}  text-white py-2 rounded-lg hover:!bg-gray-500 transition`}
        >
          {buttontext}
        </button>
      </form>
    </div>
  );
}
