import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function EditProduct() {

  const [showSaved, setShowSaved] = useState(false);

  const location = useLocation()
  const element = location.state;
  const [productname,setproductname]=useState(element.productname)
  const [category,setcategory]=useState(element.category)
  const [subcategory,setsubcategory]=useState(element.subcategory)
  const [sizes,setsizes]=useState(element.sizes)
  const [material,setmaterial]=useState(element.material)
  const [price,setprice]=useState(element.price)
  const [quantity,setquantity]=useState(element.quantity)
  const [deliverytime,setdeliverytime]=useState(element.deliverytime)
  const [availablecities,setavailablecities]=useState(element.availablecities)

  const [statusmessage,setstatusmessage]=useState('Save Changes')

  const [textcolor,settextcolor]=useState('text-black')


  const updatedata={};



  //////////////////////////////////////////// SENDING DATA TO BACKEND //////////////////////////////////////////////
//  isme apan check krre ki konse konse field update kiye user ne aur fir sirf vohi fields ko backend pe bhejre . 
//  jo field update hui vo updatedata name ke object me add ho jari 
    async function handleSubmit(e) {
    
    e.preventDefault();
    
    if(productname!=element.productname) updatedata.productname = productname
    if (category !== element.category) updatedata.category = category;
    if (subcategory !== element.subcategory) updatedata.subcategory = subcategory;
    if (JSON.stringify(sizes) !== JSON.stringify(element.sizes)) updatedata.sizes = sizes;
    if (material !== element.material) updatedata.material = material;
    if (price !== element.price) updatedata.price = Number(price);
    if (quantity !== element.quantity) updatedata.quantity = Number(quantity);
    if (String(deliverytime) !== String(element.deliverytime)) 
       updatedata.deliverytime = Number(deliverytime);
      if (Array.isArray(element.availablecities)) {
    // element.availablecities was array, current state is string
    if (availablecities !== element.availablecities.join(",")) {
      updatedata.availablecities = availablecities.split(",").map((c) => c.trim());
    }
  } else if (availablecities !== element.availablecities) {
    updatedata.availablecities = availablecities;
  }


    let result = await fetch('https://zenvio-h5be.onrender.com/editProduct',{
      method:'post',
      body:JSON.stringify({updatedata,productid:element._id}),
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      },
      
    })

    const r = await result.json()
    if(r.status==1){
      setstatusmessage(r.message)
      settextcolor('text-green-600')
      setShowSaved(true)
    }
    if(r.status==0){
      setstatusmessage(r.message)
      settextcolor('text-red-600')
      setShowSaved(true)
    }

    
    
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="flex justify-center items-center w-screen min-h-screen bg-[#eee2d6] px-4 pt-10  ">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl text-black ">
        <h1 className="text-2xl font-bold text-center mb-6">Edit Product</h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Product Name */}
          <div>
            <label className="block font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="productName"
              value={productname}
              
              onChange={(e)=>{setproductname(e.target.value)}}
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter product name"
              required
            />
          </div>


          {/* Category & Subcategory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Category</label>
              <select
                name="category"
                value={category}
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
                value={subcategory}
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
          checked={sizes.includes(size)}   // ✅ controlled by state
          onChange={(e) =>
            e.target.checked
              ? setsizes([...sizes, size]) // add size
              : setsizes(sizes.filter((s) => s !== size)) // remove size
          }
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
              value={material}
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
                value={price}
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
                value={quantity}
                
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
                name="deliverytime"
                value={deliverytime}
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
                name="availablecities"
                value={availablecities}
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
            {statusmessage}
          </button>



          
        </form>
      </div>
    </div>
  );
}
