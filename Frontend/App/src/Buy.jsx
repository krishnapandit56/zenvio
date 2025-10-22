import React from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import { useState } from "react";

export default function Buy() {
    const location = useLocation()
    const product = location.state;
    const seller = product.username
    const productid = product._id
    const productname = product.productname
    const imageurl = product.imageurl 
    const price = product.price
    const deliverytime = product.deliverytime

    const[fullname,setfullname]=useState('')
    const[contactnumber,setcontactnumber]=useState()
    const[contactemail,setcontactemail]=useState('')
    const[city,setcity]=useState('')
    const[pincode,setpincode]=useState('')
    const[address,setaddress]=useState('')
    const[quantity,setquantity]=useState()
    const[show,setshow]=useState(false)



    const[buttontext,setbuttontext] = useState('Confirm Order')
    const[buttoncolor,setbuttoncolor] = useState('!bg-black')

    async function submit(e){
      e.preventDefault()

      const date = new Date().toISOString(); 
      // Example: "2025-10-19T12:12:36.000Z"
 

      if (
    !fullname.trim() ||
    !contactnumber ||
    !contactemail.trim() ||
    !city.trim() ||
    !pincode.trim() ||
    !address.trim() ||
    !quantity
  ) {
    setbuttontext("Please fill all fields");
    setbuttoncolor("!bg-red-600");
    return;
  }
      

      const result = await fetch('https://zenvio-h5be.onrender.com/confirmorder',
        {
          method:'post',
          credentials:'include',
          body:JSON.stringify({fullname,contactnumber,contactemail,city,pincode,address,quantity,date,seller,productid,productname,imageurl,price,deliverytime}),
          headers:{
            'Content-type':'application/json'
          }
        }
      )

      const r = await result.json()
      setbuttontext(r.ordermessage)
      if(r.status===1){
        setbuttoncolor('!bg-green-600')
        setshow(true)
      }
      if(r.status===0){
        setbuttoncolor('!bg-red-600')
      }
      
    }


    
    
  return (
    <div className="min-h-screen w-screen bg-orange-50 flex items-center justify-center p-6 pt-40 text-black">
      <div className="pt-18 md:pt-0 bg-white rounded-2xl shadow-lg flex flex-col gap-4 md:flex-row w-full max-w-5xl overflow-auto ">
        
        {/* Left: Product Image Preview */}
        <div className="relative top-[50px] md:static md:w-1/2 w-full flex items-center justify-center bg-gray-50 p-8 flex-col gap-4">
          <img
            src={product.imageurl} // replace this with your product image path or prop
            alt="Product Preview"
            className="w-64 h-64 object-cover rounded-xl border border-gray-300 shadow-sm"
          />
          <h2 className="text-5xl">₹{product.price}</h2>
        </div>

        {/* Right: Form */}
        <div className="md:w-1/2 w-full p-8 text-black">
          <h2 className="text-3xl font-bold text-center mb-8">Confirm Your Order</h2>
          <form className="space-y-3" onSubmit={submit}>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
              onChange={(e)=>{setfullname(e.target.value)}}
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            <div className="text-black">
              <label className="block text-gray-700 font-medium mb-1">Contact Number</label>
              <input
              onChange={(e)=>{setcontactnumber(e.target.value)}}
                type="text"
                placeholder="10-digit phone number"
                className=" !text-black w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Contact Email</label>
              <input
                onChange={(e)=>{setcontactemail(e.target.value)}}
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            <div className="flex space-x-3">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">City</label>
                <input
                  onChange={(e)=>{setcity(e.target.value)}}
                  type="text"
                  placeholder="Enter your city"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">Pincode</label>
                <input
                onChange={(e)=>{setpincode(e.target.value)}}
                  type="text"
                  placeholder="Enter pincode"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Detailed Address</label>
              <textarea
                rows="3"
                onChange={(e)=>{setaddress(e.target.value)}}
                placeholder="Full address with house number, street, etc."
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-black focus:outline-none resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Quantity of Product</label>
              <input
                onChange={(e)=>{setquantity(e.target.value)}}
                type="number"
                placeholder="Enter quantity"
                min="1"
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className={`w-full ${buttoncolor} text-white font-semibold py-2.5 rounded-lg hover:bg-gray-800 transition`}
            >
              {buttontext}
            </button>
            {show?<p className="pl-4">You Can Verify Full Order Details In <b>'Your Orders'</b> Section</p>:<></>}
          </form>
        </div>
      </div>
    </div>
  );
}
