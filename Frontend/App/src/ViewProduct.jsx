import { useNavigate, useLocation,useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function ViewProduct(){
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const productid = searchParams.get("productid")
    const [product,setproduct] = useState({})
    const [seller,setseller]= useState({})
    const [cartstatus,setcartstatus]=useState('Add To Cart') // ye page me apan product ka pura data fetch karre kyuki user usko as a seperate link open kre to usko data mil paye 
    
    useEffect(()=>{
        async function fetchproduct(){
            const result = await fetch(`http://localhost:7000/viewproduct/${productid}`)
            let r = await result.json()
            setproduct(r.product)
            setseller(r.seller)
            
        }
        fetchproduct()


    },[productid])

    async function addtocart(){
        const result = await fetch('http://localhost:7000/addtocart',{
            method:'post',
            body:JSON.stringify({productid:product._id}),
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            }
        })
        let r = await result.json()
        setcartstatus(r.cartmessage)

    }




    return(
        <>
        {/* Removed h-screen to allow height to adjust to content */}
        <div className="w-screen min-h-screen bg-white p-4 md:p-10 "> 

            

            
            
            {/* Flex container for image and details. Adjusted layout for better responsiveness */}
            <div className="flex flex-col lg:flex-row gap-0 "> 

                
                
                {/* Image Container: Made it relative to flow and gave it a max-width */}
                <div className="relative top-[300px] md:static w-full lg:w-1/3 flex items-center justify-center pt-80">
                    <img src={product.imageurl} alt={product.productname} className="max-h-[500px] object-contain"/> 
                </div>

                {/* Details Container: Removed fixed height, absolute positioning, and reduced max-width for better flow */}
                <div className="text-black w-full lg:w-2/3 flex flex-col gap-2 pt-85 " >
                    
                    
                    <h2 className="text-black text-4xl"><b>{product.productname}</b></h2>
                    <h2 className="text-red-500 text-3xl w-fit  flex items-center rounded-[5px] "><b>{product.price} ₹</b></h2>
                    <div className="flex flex-row gap-4">
                        <button onClick={()=>{navigate(`/Buy?productname=${product.productname}&productid=${productid}`,{state:product})}} className="!bg-yellow-500 hover:!bg-yellow-700">Buy Now</button>
                        <button className="!bg-yellow-300 hover:!bg-yellow-500" onClick={()=>{addtocart()}}>{cartstatus}</button>
                    </div>

                    
                    
                    {/* About Product Section */}
                    <div className=" rounded-2xl flex justify-center flex-col gap-1 pt-5 pb-5 pl-5 bg-gradient-to-r from-orange-100 to-white ">
                        <h2 className="text-gray-700 text-3xl font-bold">About Product</h2>
                    <h2 className="text-black text-xl"><b>Product Id :</b> {product._id}</h2>
                    <h2 className="text-black text-xl"><b>Category :</b> {product.category}</h2>
                    <h2 className="text-black text-xl"><b>Sub Category :</b> {product.subcategory}</h2>
                    <h2 className="text-black text-xl"><b>Material :</b> {product.material}</h2>
                    {/* Added better handling for the sizes array */}
                    <h2 className="text-black text-xl"><b>Available Sizes :</b> {Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes.join(" , ") : "NA"}</h2>
                    </div>
                    

                    
                    
                    {/* Other Details Section (First instance) */}
                    <div className=" rounded-2xl flex justify-center flex-col gap-1 pt-5 pb-5 pl-5 bg-gradient-to-r from-orange-100 to-white">
                    <h2 className="text-gray-700 text-3xl font-bold">Other Details</h2>
                    <h2 className="text-black text-xl"><b>Available Quantity :</b> {product.quantity}</h2>
                    <h2 className="text-black text-xl"><b>Available Cities :</b> {product.availablecities}</h2>
                    <h2 className="text-black text-xl"><b>Delivery Time :</b> {product.deliverytime} (Days)</h2>

                    </div>
                    
                    {/* Other Details Section (Second instance - assuming this is a duplicate you want to keep or replace with Seller info) */}
                    {/* If this is meant to be SELLER DETAILS, you would replace the product properties with seller properties */}
                    
                    <div className=" rounded-2xl flex justify-center flex-col gap-1 pt-5 pb-5 pl-5 bg-gradient-to-r from-orange-100 to-white">
                    <h2 className="text-gray-700 text-3xl font-bold">Seller Information </h2> 
                    {/* Assuming seller object has name and contact */}
                    <h2 className="text-black text-xl"><b>Store Name :</b> {seller.storename || "N/A"}</h2>
                    <h2 className="text-black text-xl"><b>State :</b> {seller.state || "N/A"}</h2>
                    {/* If it's a duplicate of "Other Details", it's fine as is, but often this is where you'd put seller info */}
                    <h2 className="text-black text-xl"><b>City :</b> {seller.city}</h2>
                    <h2 className="text-black text-xl"><b>Address :</b> {seller.address}</h2>
                    <h2 className="text-black text-xl"><b>Email:</b> {seller.email} </h2>
                    </div>
                </div>
            </div>
            {/* Added a spacer div to ensure content doesn't get cut off at the bottom, helpful for sticky footers or padding */}
            <div className="pb-10"></div> 
        </div>
        </>
    )
}