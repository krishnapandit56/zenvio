import { useEffect } from "react"
import { useState } from "react"
import { useLocation,useNavigate } from "react-router-dom"

export default function YourCart(){
    const Navigate = useNavigate()
    const [cartarray,setcartarray]=useState([])


    async function getcart(){
        const result = await fetch('/getcart',{
            method:'post',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            }
        })
        const r = await result.json()
        setcartarray(r.cartarray)

    }

    async function removecart(productid){
      const result = await fetch('/removecart',{
        method:'post',
        credentials:'include',
        body:JSON.stringify({productid:productid}),
        headers:{  
          'Content-Type':'application/json'
        }
      })

      let r = await result.json()
      if(r.removestatus==1){
        window.location.reload()
      }
    }

    useEffect(()=>{
        getcart()
    },[])

    return(
        <>
        <div className="flex flex-col gap-4 bg-gradient-to-r from-orange-50 to-orange-200 pt-0">
        <div className="flex items-center justify-center   ">
                <h1 className="text-black">Your Cart</h1>
            </div>
         <div className="w-screen h-[651.5px] bg-white overflow-auto px-4">
            
        {cartarray.map((element) => (
          <div
            key={element._id}
            className="border-gray-600 rounded-[5px] flex items-center shadow-md shadow-gray-400 pt-8 pl-2 pr-2 mb-4 hover:cursor-pointer "
            onClick={()=>{Navigate(`/viewproduct?productname=${element.productname}&productid=${element._id}`,{state:element})}}
          >
            <div className="h-[165px] w-[165px] flex-shrink-0">
              <img src={element.imageurl} className="h-full w-full object-cover" />
            </div>

            <div className="pl-5 pt-2 pb-2 flex-1">
              <h2 className="text-black">
                <b>Product Name :</b> {element.productname}
              </h2>
              <h2 className="text-black">
                <b>Product ID :</b> {element._id}
              </h2>
              <h2 className="text-black">
                <b>Category :</b> {element.category}
              </h2>
              <h2 className="text-black">
                <b>Sub Category :</b> {element.subcategory}
              </h2>
              <h2 className="text-black">
                <b>Available Sizes :</b> {element.sizes.join(",")}
              </h2>
              <h2 className="text-black">
                <b>Material :</b> {element.material}
              </h2>
              <h2 className="text-black">
                <b>Price :</b> {element.price}
              </h2>
              <h2 className="text-black">
                <b>Quantity :</b> {element.quantity}
              </h2>
              <h2 className="text-black">
                <b>Delivery Time :</b> {element.deliverytime} (Days)
              </h2>
              <h2 className="text-black">
                <b>Available In Cities :</b> {element.availablecities}
              </h2>
              
            </div>

            <div className="flex flex-col ml-auto pr-4 gap-5">

              <button
                className="!bg-white text-black shadow-md shadow-gray-500 !rounded-none" 
                onClick={()=>{removecart(element._id)}}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
        </>
    )
}