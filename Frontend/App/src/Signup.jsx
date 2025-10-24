import {Link,useNavigate} from 'react-router-dom'
import { useState } from 'react';


export default function Signup() {
// =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=
const Navigate = useNavigate()

const [username,setusername]=useState('')
const [password,setpassword]=useState('')
const [confirmpassword,setconfirmpassword]=useState('')
const [email,setemail]=useState('')
const [statusmessage,setstatusmessage]=useState('')
const [buttontext,setbuttontext]=useState('Sign Up')

const userdata = {username,email,password}

async function handleSubmit(e){
  e.preventDefault()
  setbuttontext('Sending OTP ...')
  let result = await fetch('https://zenvio-h5be.onrender.com/sendotp',{
    method:'post',
    body:JSON.stringify({email,username}),
    headers:{
      "Content-Type":'application/json'
    }
  })
  let r = await result.json()
  console.log('r is  ',r)
  setstatusmessage(r.statusmessage)
  if(r.statuscode==0){
    setbuttontext('Sign Up')
  }
  if(r.emailstatus==1){
    Navigate('/otp',{state:userdata})
  }
}

// async function signup(e){
//   e.preventDefault()
//   if(password!=confirmpassword){
//     console.log('password and confirm password does not match !!')
//   }
//   let result = await fetch('http://localhost:7000/Signup',{
//     method:'post',
//     body:JSON.stringify({username,email,password}),
    
//     headers:{
//       "Content-Type":"application/json"
//     }
//   })

//   let r = await result.json()
//   setstatusmessage(r.statusmessage)
// }

// =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=
  return (
    <div className="h-screen w-screen bg-[#DDDAD0] flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
        <h1
          className="text-4xl font-bold mb-10 text-center "
          style={{ color: "#57564F" }}
        >
          Zenvio
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
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

          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#57564F]"
              onChange={(e)=>{setemail(e.target.value)}}
            />
          </div>

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

                    <div>
            <label
              htmlFor="confirm password"
              className="block mb-2 font-semibold text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmpassword"
              name="password"
              placeholder="Enter your confirm password"
              required
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#57564F]"
              onChange={(e)=>{setconfirmpassword(e.target.value)}}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#57564F] text-white font-bold py-3 rounded-md hover:!bg-gray-700 transition-colors"
            
          >
            {buttontext}
          </button>
          <div className='flex justify-center h-[7px]  items-center'>
            <h2 className='text-black'>{statusmessage}</h2>
          </div>
        </form>
        <div className='flex items-center justify-center relative top-[20px]'>
          <Link to='/signin'>Already Have An Account ? Click Here</Link>
        </div>

        <div className='flex justify-center relative top-[25px]'>
          <Link to='/SignupAsSeller'className='!text-black animate-pulse '><b>Click Here To Create A Seller Account</b></Link>
        </div>
      </div>
      
        
      
    </div>
  );
}
