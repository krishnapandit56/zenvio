import { Link ,useNavigate} from 'react-router-dom'
import { useState } from 'react'

export default function SignupAsSeller() {
  
  const Navigate = useNavigate()

  const [ownername,setownername]=useState('')
  const [ownerphonenumber,setownerphonenumber]=useState('')
  const [email,setemail]=useState('')
  const [username,setusername]=useState('')
  const [password,setpassword]=useState('')
  const [storename,setstorename]=useState('')
  const [state,setstate]=useState('')
  const [city,setcity]=useState('')
  const [address,setaddress]=useState('')
  const [storephonenumber,setstorephonenumber]=useState('')

  const [buttontext,setbuttontext]=useState('Sign Up')
  const [statusmessage,setstatusmessage]=('')
  
  const sellerdata = {ownername,ownerphonenumber,email,username,password,storename,state,city,address,storephonenumber}

  async function handlesubmit(e){
    e.preventDefault()
    setbuttontext('Sending OTP ...')

    let result = await fetch('https://zenvio-h5be.onrender.com/sendotpseller',{
      method:'post',
      body:JSON.stringify({email,username}),
      headers:{
      "Content-Type":'application/json'
    }

    })
      let r = await result.json()
  
  if(r.statuscode==0){
    setbuttontext('Sign Up')
    setstatusmessage(r.statusmessage)
  }
  if(r.emailstatus==1){
    Navigate('/otp-seller',{state:sellerdata})
  }
 
    
  }
  // /=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/
  return (
    <div className="h-screen w-screen bg-[#DDDAD0] flex items-center justify-center px-4 pt-75 overflow-auto">
      <div className="bg-white p-8 md:p-10 rounded-lg shadow-lg max-w-2xl w-full overflow-y-auto">
        <h1
          className="text-4xl font-bold mb-8 text-center"
          style={{ color: "#57564F" }}
        >
          Zenvio
        </h1>

        <form className="space-y-8 pt-6" onSubmit={handlesubmit}>
          {/* Owner Details */}
          <section>
            <h2 className="text-xl font-semibold mb-4" style={{ color: "#57564F" }}>
              Owner Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ownerName" className="block mb-2 font-semibold text-gray-700">
                  Owner Real Name (Full Name)
                </label>
                <input
                  type="text"
                  id="ownerName"
                  name="ownerName"
                  placeholder="Enter owner's real name"
                  required
                  onChange={(e)=>{setownername(e.target.value)}}
                  className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#57564F]"
                />
              </div>

              <div>
                <label htmlFor="ownerPhone" className="block mb-2 font-semibold text-gray-700">
                  Owner Phone Number
                </label>
                <input
                  type="tel"
                  id="ownerPhone"
                  name="ownerPhone"
                  placeholder="10-digit phone number"
                  pattern="[0-9]{10}"
                  required
                  onChange={(e)=>{setownerphonenumber(e.target.value)}}
                  className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#57564F]"
                />
              </div>

              <div>
                <label htmlFor="ownerName" className="block mb-2 font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  required
                  onChange={(e)=>{setemail(e.target.value)}}
                  className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#57564F]"
                />
              </div>

              <div>
                <label htmlFor="username" className="block mb-2 font-semibold text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Choose a username"
                  required
                  onChange={(e)=>{setusername(e.target.value)}}
                  className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#57564F]"
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 font-semibold text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  onChange={(e)=>{setpassword(e.target.value)}}
                  className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#57564F]"
                />
              </div>
            </div>
          </section>

          {/* Shop/Store Details */}
          <section>
            <h2 className="text-xl font-semibold mb-4" style={{ color: "#57564F" }}>
              Shop / Store Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="shopName" className="block mb-2 font-semibold text-gray-700">
                  Store/Shop Name
                </label>
                <input
                  type="text"
                  id="shopName"
                  name="shopName"
                  placeholder="Enter store/shop name"
                  required
                  onChange={(e)=>{setstorename(e.target.value)}}
                  className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#57564F]"
                />
              </div>

              <div>
                <label htmlFor="state" className="block mb-2 font-semibold text-gray-700">
                  State
                </label>
                <select
                  id="state"
                  name="state"
                  required
                  onChange={(e)=>{setstate(e.target.value)}}
                  className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#57564F] bg-white"
                >
                  <option value="">Select state</option>
                  <option>Andhra Pradesh</option>
                  <option>Arunachal Pradesh</option>
                  <option>Assam</option>
                  <option>Bihar</option>
                  <option>Chhattisgarh</option>
                  <option>Goa</option>
                  <option>Gujarat</option>
                  <option>Haryana</option>
                  <option>Himachal Pradesh</option>
                  <option>Jharkhand</option>
                  <option>Karnataka</option>
                  <option>Kerala</option>
                  <option>Madhya Pradesh</option>
                  <option>Maharashtra</option>
                  <option>Manipur</option>
                  <option>Meghalaya</option>
                  <option>Mizoram</option>
                  <option>Nagaland</option>
                  <option>Odisha</option>
                  <option>Punjab</option>
                  <option>Rajasthan</option>
                  <option>Sikkim</option>
                  <option>Tamil Nadu</option>
                  <option>Telangana</option>
                  <option>Tripura</option>
                  <option>Uttar Pradesh</option>
                  <option>Uttarakhand</option>
                  <option>West Bengal</option>
                </select>
              </div>

              <div>
                <label htmlFor="city" className="block mb-2 font-semibold text-gray-700">
                  City 
                </label>
                <select
                  id="city"
                  name="city"
                  required
                  onChange={(e)=>{setcity(e.target.value)}}
                  className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#57564F] bg-white"
                >
                  <option value="">Select city</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Bengaluru</option>
                  <option>Hyderabad</option>
                  <option>Ahmedabad</option>
                  <option>Chennai</option>
                  <option>Kolkata</option>
                  <option>Pune</option>
                  <option>Surat</option>
                  <option>Jaipur</option>
                  <option>Lucknow</option>
                  <option>Kanpur</option>
                  <option>Nagpur</option>
                  <option>Indore</option>
                  <option>Thane</option>
                  <option>Bhopal</option>
                  <option>Visakhapatnam</option>
                  <option>Patna</option>
                  <option>Vadodara</option>
                  <option>Ghaziabad</option>
                  <option>Ludhiana</option>
                  <option>Agra</option>
                  <option>Nashik</option>
                  <option>Faridabad</option>
                  <option>Meerut</option>
                  <option>Rajkot</option>
                  <option>Varanasi</option>
                  <option>Srinagar</option>
                  <option>Aurangabad</option>
                  <option>Amritsar</option>
                  <option>Navi Mumbai</option>
                  <option>Prayagraj</option>
                  <option>Ranchi</option>
                  <option>Coimbatore</option>
                  <option>Jabalpur</option>
                  <option>Gwalior</option>
                  <option>Vijayawada</option>
                  <option>Madurai</option>
                  <option>Raipur</option>
                  <option>Kota</option>
                  <option>Chandigarh</option>
                  <option>Guwahati</option>
                  <option>Solapur</option>
                  <option>Mysuru</option>
                  <option>Tiruchirappalli</option>
                  <option>Bareilly</option>
                  <option>Moradabad</option>
                  <option>Noida</option>
                  <option>Gurugram</option>
                  <option>Jalandhar</option>
                  <option>Bhubaneswar</option>
                  <option>Kochi</option>
                  <option>Dehradun</option>
                  <option>Durgapur</option>
                  <option>Asansol</option>
                  <option>Jamshedpur</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="address" className="block mb-2 font-semibold text-gray-700">
                  Address of Shop
                </label>
                <textarea
                  id="address"
                  name="address"
                  placeholder="Full shop address"
                  required
                  rows={3}
                  onChange={(e)=>{setaddress(e.target.value)}}
                  className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#57564F]"
                />
              </div>

              <div>
                <label htmlFor="shopPhone" className="block mb-2 font-semibold text-gray-700">
                  Shop Phone Number
                </label>
                <input
                  type="tel"
                  id="shopPhone"
                  name="shopPhone"
                  placeholder="10-digit phone number"
                  pattern="[0-9]{10}"
                  required
                  onChange={(e)=>{setstorephonenumber(e.target.value)}}
                  className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#57564F]"
                />
              </div>
            </div>
          </section>

          <button
            type="submit"
            className="w-full bg-[#57564F] text-white font-bold py-3 rounded-md hover:!bg-gray-600 transition-colors"
          >
            {buttontext}
          </button>
          <div className='flex justify-center relative bottom-[15px]'>
            <h2 className='text-black text-[20px] '>{statusmessage}</h2>
          </div>
        </form>
      </div>

    </div>
  )
}
