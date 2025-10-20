import { useLocation, useNavigate } from "react-router-dom"
import { useState,useEffect } from "react";


export default function YourOrders(){
    const location = useLocation();
    const username = location.state

    const[orders,setorders]=useState([])

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
    fetchOrders()
  },[])

    return(
        <>
        <div className="w-screen h-screen bg-white">

            <div className="w-full lg:w-screen bg-white shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4 text-center bg-[#f1ac66] text-white py-2 rounded-lg">
            Your Orders
          </h2>
<div className=" h-screen lg:h-[630px] overflow-y-auto space-y-4 pr-2">
  {orders.map((order, index) => {
  // Convert order.date (string) to Date
  const orderDate = new Date(order.date);

  // Add delivery time (in days)
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(orderDate.getDate() + order.deliverytime);

  // Format the date nicely
  const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      key={index}
      className="bg-gray-200 rounded-lg p-3 text-sm shadow text-black flex flex-row gap-6 pb-5 pt-5"
    >
      <div className="h-1/4 w-1/4">
        <img src={order.imageurl} alt={order.productname} />
      </div>
      <div className="relative flex flex-col gap-1">
        <p className="text-[15px]">
          <span className="font-semibold">Product Name:</span>{" "}
          {order.productname}
        </p>
        <p className="text-[15px]">
          <span className="font-semibold">Price:</span> ₹{order.price}
        </p>
        <p className="text-[15px]">
          <span className="font-semibold">Product Id:</span> {order.productid}
        </p>
        <hr></hr>
        <p className="text-[15px]">
          <span className="font-semibold">Customer Name:</span>{" "}
          {order.fullname}
        </p>
        <p className="text-[15px]">
          <span className="font-semibold">Contact Number:</span>{" "}
          {order.contactnumber}
        </p>
        <p className="text-[15px]">
          <span className="font-semibold">Contact Email:</span>{" "}
          {order.contactemail}
        </p>
        <p className="text-[15px]">
          <span className="font-semibold">City:</span> {order.city}
        </p>
        <p className="text-[15px]">
          <span className="font-semibold">Pin Code:</span> {order.pincode}
        </p>
        <p className="text-[15px]">
          <span className="font-semibold">Address:</span> {order.address}
        </p>
        <hr></hr>
        <p className="text-[15px]">
          <span className="font-semibold">Ordered On:</span>{" "}
          {new Date(order.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-[15px]">
          <span className="font-semibold">Delivery Time:</span>{" "}
          {order.deliverytime} days
        </p>
        <p className="text-[15px]">
          <span className="font-semibold">Order Id:</span> {order._id}
        </p>
        <h2 className="text-5xl relative top-[0px] text-green-700">
                    
          <span className="">Arriving By </span>{" "}
          <b>{formattedDeliveryDate}</b>
        
        </h2>
      </div>
    </div>
  );
})}

</div>
        </div>
            

        </div>
        </>
    )
}