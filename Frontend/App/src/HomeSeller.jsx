import { useEffect, useState } from "react"
import { useLocation ,useNavigate} from "react-router-dom"

export default function HomeSeller() {
  const location = useLocation()
  const username = location.state
  const Navigate = useNavigate()

  const[orders,setorders]=useState([])
  const [totalrevenue,settotalrevenue]=useState(0)

  async function logout(){
    const result = await fetch('http://localhost:7000/logout',{
      method:'post',
      credentials:'include'
    })

    Navigate('/',{replace:true})
  }

  function calculaterevenue(){
    let total =0
    orders.forEach(order=>{
      total=total+order.price
    })
    settotalrevenue(total)
  }

  async function fetchOrders(){
    const result = await fetch('http://localhost:7000/fetchOrders',{
      method:'post',
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      }
    })

    const r = await result.json()
    setorders(r.array)
  }

  useEffect(()=>{
    fetchOrders();
    
  },[])

    useEffect(()=>{
    calculaterevenue();
    
  },[orders])




  return (
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col ">
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-gradient-to-r from-white to-[#f1ac66] text-white p-4 pr-10">
        <h1 className="text-lg font-bold text-gray-700">Dashboard</h1>
        <button className="!bg-white text-black px-4  pr-0 rounded-lg hover:!bg-gray-200" onClick={()=>{logout()}}>
          Log out
        </button>
      </div>

      {/* Content Area */}
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Sidebar - New Orders */}
        <div className="w-full lg:w-1/2 bg-white shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4 text-center bg-[#f1ac66] text-white py-2 rounded-lg">
            New Orders
          </h2>
<div className="h-[50vh] lg:h-[70vh] overflow-y-auto space-y-4 pr-2">
  {orders.map((order, index) => (
    <div
      key={index}
      className="bg-gray-200 rounded-lg p-3 text-sm shadow text-black flex flex-row gap-4"
    >
      <div className="h-1/4 w-1/4">
        <img src={order.imageurl}></img>
      </div>
      <div className="relative">
              <p>
        <span className="font-semibold">Product Name:</span>{" "}
        {order.productname}
      </p>
      <p>
        <span className="font-semibold">Price:</span>{" "}
        ₹{order.price}
      </p>
      <p>
        <span className="font-semibold ">Product Id:</span>{" "}
        {order.productid}
      </p>

       <p>
        <span className="font-semibold ">Customer Name:</span>{" "}
        {order.fullname}
      </p>
      <p>
        <span className="font-semibold ">Contact Number:</span>{" "}
        {order.contactnumber}
      </p>
      <p>
        <span className="font-semibold ">Contact Email:</span>{" "}
        {order.contactemail}
      </p>
      <p>
        <span className="font-semibold ">City:</span>{" "}
        {order.city}
      </p>
      <p>
        <span className="font-semibold ">Pin Code:</span>{" "}
        {order.pincode}
      </p>
      <p>
        <span className="font-semibold ">Address:</span>{" "}
        {order.address}
      </p>
      <p>
        <span className="font-semibold ">Ordered On :</span>{" "}
        {order.date}
      </p>
      <p>
        <span className="font-semibold ">Delivery Time :</span>{" "}
        {order.deliverytime}
      </p>
      <p>
        <span className="font-semibold ">Order Id:</span>{" "}
        {order._id}
      </p>
        </div>


    </div>
  ))}
</div>
        </div>

        {/* Main Section */}
        <div className="flex-1 p-6 text-black">
          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h3 className="text-xl font-bold">Total Sales</h3>
              <p className="text-2xl font-semibold mt-2">{orders.length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h3 className="text-xl font-bold">Top City</h3>
              <p className="text-2xl font-semibold mt-2">Not Enough Data</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h3 className="text-xl font-bold">Total Revenue</h3>
              <p className="text-2xl font-semibold mt-2">₹ {totalrevenue}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h3 className="text-xl font-bold">Views</h3>
              <p className="text-2xl font-semibold mt-2">8,940</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gray-700 text-white px-6 py-3 rounded-full shadow hover:!bg-gray-600" onClick={()=>{Navigate('/Your-Products')}}>
              Your Products
            </button>
            <button className="bg-gray-700 text-white px-6 py-3 rounded-full shadow hover:!bg-gray-600" onClick={()=>{Navigate('/Add-Product',{state:username})}}>
              Add New Product
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
