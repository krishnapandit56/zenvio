import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function AddProduct() {

  const location = useLocation()
  const username = location.state;
  const [productname,setproductname]=useState('')
  const [image,setimage]=useState('')
  const [category,setcategory]=useState('')
  const [subcategory,setsubcategory]=useState('')
  const [sizes,setsizes]=useState([])
  const [material,setmaterial]=useState('')
  const [price,setprice]=useState(0)
  const [quantity,setquantity]=useState(0)
  const [deliverytime,setdeliverytime]=useState(0)
  const [availablecities,setavailablecities]=useState('')


  const [status,setstatus]=useState('')
  const [textcolor,settextcolor]=useState('text-black')


  //////////////////////////////////UPLOADING IMAGE TO CLOUDINARY//////////////////////////////////////////////////////////

  async function uploadImage(){
    setstatus('Uploading Image ...')
    const formData = new FormData();
    formData.append('file',image)
    formData.append('upload_preset','ZenvioImage')
    

      const res = await fetch('https://api.cloudinary.com/v1_1/dvvjgdoqp/image/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json();
      
      if(data.secure_url){
        setstatus('Image Uploaded')
      }
      if(!data.secure_url){
        setstatus(data.error.message)
      }
      return data.secure_url
      
  }

  //////////////////////////////////////////// SENDING DATA TO BACKEND //////////////////////////////////////////////

    async function handleSubmit(e) {

    e.preventDefault();
    const imageurl = await uploadImage()

    setstatus('Uploading Data ...')

    let result = await fetch('https://zenvio-h5be.onrender.com/addProduct',{
      method:'post',
      body:JSON.stringify({productname,imageurl,category,subcategory,sizes,material,price,quantity,username,deliverytime,availablecities}),
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      },
      
    })

    let r = await result.json()
    if(r.statuscode==1){
      settextcolor('text-green-600')
    }
    if(r.statuscode==0){
      settextcolor('text-red-600')
    }
    
    setstatus(r.statusmessage)
    
    
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="flex justify-center items-center w-screen min-h-screen bg-gray-100 px-4 pt-90 md:pt-50 ">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl text-black ">
        <h1 className="text-2xl font-bold text-center mb-6">Add Product</h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Product Name */}
          <div>
            <label className="block font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="productName"
              
              onChange={(e)=>{setproductname(e.target.value)}}
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Upload Image */}
          <div>
            <label className="block font-medium mb-1">Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={(e)=>{setimage(e.target.files[0])}}
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              accept="image/*"
              required
            />
          </div>

          {/* Category & Subcategory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Category</label>
              <select
                name="category"
                
                onChange={(e)=>{setcategory(e.target.value)}}
                className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              >
                <option value="">Select category</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
                <option value="kids">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">Sub Category</label>
              <select
                name="subCategory"
                
                onChange={(e)=>{setsubcategory(e.target.value)}}
                className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              >
                <option value="">Select sub-category</option>
                <option value="tshirt">T-Shirt</option>
                <option value="shirt">Shirt</option>
                <option value="pant">Pant</option>
                <option value="jacket">Jacket</option>
              </select>
            </div>
          </div>

          {/* Available Sizes */}
          <div>
            <label className="block font-medium mb-1">Available Sizes</label>
            <div className="flex flex-wrap gap-4">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <label key={size} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="sizes"
                    value={size}
                    
                    onChange={(e)=>{setsizes(e.target.checked?[...sizes,size]:sizes.filter((s) => s !== size))}}
                    className="border border-gray-400 rounded shadow-sm focus:ring-2 focus:ring-gray-400"
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>

          {/* Material */}
          <div>
            <label className="block font-medium mb-1">Material</label>
            <input
              type="text"
              name="material"
              
              onChange={(e)=>{setmaterial(e.target.value)}}
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="e.g. Cotton, Polyester"
              required
            />
          </div>

          {/* Price & Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                
                onChange={(e)=>{setprice(e.target.value)}}
                className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Enter price"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Quantity Available</label>
              <input
                type="number"
                name="quantity"
                
                onChange={(e)=>{setquantity(e.target.value)}}
                className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Enter quantity"
                required
              />
            </div>
            
          </div>
          
            <div>
              <label className="block font-medium mb-1">Delivery Time (Days)</label>
              <input
                type="number"
                name="price"
                
                onChange={(e)=>{setdeliverytime(e.target.value)}}
                className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Enter Maximum Number Of Days In Which You Can Deliver  "
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Available In Cities</label>
              <input
                type="text"
                name="price"
                
                onChange={(e)=>{setavailablecities(e.target.value)}}
                className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Enter Cities In Which You Can Deliver Seperated By ',' . Ex - Nagpur,Pune  "
                required
              />
            </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:!bg-gray-600 transition shadow-md"
          >
            Add Product
          </button>
          <div className="flex justify-center">
            <h2 className={`${textcolor} text-[20px]`}><b>{status}</b></h2>
          </div>
        </form>
      </div>
    </div>
  );
}
