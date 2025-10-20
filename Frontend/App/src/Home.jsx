import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  const username = location.state;
  const Navigate = useNavigate();

  const [searchtext, setSearchtext] = useState("");
  const [searcharray, setSearcharray] = useState([]);

  // Fetch search results
  async function fetchsearch(query) {
    const result = await fetch(
      `http://localhost:7000/searchproduct?searchtext=${encodeURIComponent(
        query
      )}`,
      {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let r = await result.json();
    setSearcharray(r.searchproduct || []);
  }

  // Navigate on search
  function search() {
    Navigate(`/Home?searchtext=${encodeURIComponent(searchtext)}`,{state:username});
  }

  // Run search when URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("searchtext") || "";
    setSearchtext(query);
    fetchsearch(query);
  }, [location.search]);

  return (
    <div className="min-h-screen max-w-screen  bg-gray-50 overflow-x-hidden overflow-y-auto">
      {/* Navbar */}
<nav className=" w-[300px] flex items-center justify-center md:flex md:flex-row gap-10 md: fixed md:w-full top-0 bg-orange-100 shadow-sm px-6 py-3 flex items-center">
  {/* Left: Logo */}
  <div className="relative  md:static  md:flex-shrink-0 text-5xl font-extrabold text-gray-800 tracking-wide">
    ZENVIO
  </div>
 

  {/* Middle: Search bar */} 
  <div className="relative top-[120px] left-[50px] md:static md:top-auto flex-1 flex justify-center mx-4 flex-shrink-0 ">
    <div className="!flex-shrink-0 flex w-[600px] relative right-[100px] ">
      <input
        type="text"
        placeholder="Search clothing..."
        value={searchtext || ""}
        onChange={(e) => setSearchtext(e.target.value)}
        className="w-[250px] absolute left-[120px] md:relative md:left-auto  md:w-auto md:flex-1 h-10 px-3 border border-gray-300 rounded-l-md focus:outline-none !bg-white text-black"
      />
      <button
        onClick={search}
        className="relative  left-[350px] md:static md:top-auto md:h-10 w-12 bg-orange-400 flex items-center justify-center rounded-r-md hover:bg-orange-500 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
          />
        </svg>
      </button>
    </div>
  </div>

  {/* Right: Buttons */}

</nav>
  <div  className="hidden md:block flex md:w-[380px] md:flex space-x-1 flex-shrink-0 fixed top-0 right-1 h-[72px] ">
    <button onClick={()=>{Navigate('/yourcart',{state:username})}} className="w-[80px] md:w-[100px] flex items-center justify-center md:px-0 py-0 !bg-orange-200 text-gray-700 !rounded-none hover:!bg-orange-100 transition">
      Your Cart
    </button>
    <button className="w-[80px] md:w-[100px] flex items-center md:px-0 py-0 !bg-orange-200 text-gray-700 !rounded-none hover:!bg-orange-100 transition">
      Your Orders
    </button>
    <button className="w-[80px] md:w-[100px] flex items-center md:px-0 py-0 !bg-orange-200 text-gray-700 !rounded-none hover:!bg-orange-100 transition">
      {username}
    </button>
        <button className="w-[80px] md:w-[100px] flex items-center md:px-0 py-0 !bg-orange-300 text-gray-700 !rounded-none hover:!bg-orange-100 transition">
      Logout
    </button>
  </div>

    <div  className="w-[490px] block relative left-[7px] right-[15px] md:hidden flex md:w-[380px] md:flex space-x-1 flex-shrink-0 fixed top-0 right-1 h-[72px] ">
    <button onClick={()=>{Navigate('/yourcart',{state:username})}} className="w-[80px] md:w-[100px] flex items-center justify-center md:px-0 py-0 !bg-orange-200 text-gray-700 !rounded-none hover:!bg-orange-100 transition">
      Your Cart
    </button>
    <button className="overflow-hidden w-[80px] md:w-[100px] flex items-center md:px-0 py-0 !bg-orange-200 text-gray-700  !rounded-none hover:!bg-orange-100 transition">
      Your Orders
    </button>
    <button className="w-[80px] md:w-[100px] flex items-center md:px-0 py-0 !bg-orange-200 text-gray-700 !rounded-none hover:!bg-orange-100 transition">
      {username}
    </button>
        <button className="w-[80px] md:w-[100px] flex items-center md:px-0 py-0 !bg-orange-300 text-gray-700 !rounded-none hover:!bg-orange-100 transition">
      Logout
    </button>
  </div>

   <div className="relative top-[5px] left-[70px]  md:hidden text-5xl font-extrabold text-gray-800 tracking-wide">
    ZENVIO
  </div>


      {/* Main content */}
      <main className="hidden md:block p-5 text-center text-gray-500 pt-35">
        <h1 className="text-3xl font-semibold">Welcome to ZENVIO Clothing</h1>
        <p className="mt-4">Discover the latest trends and timeless styles.</p>
      </main>

      {/* Search results */}
      <div className="relative top-[100px] text-[10px] md:text-sm md:static md:w-[350px] md:w-screen h-[601.5px] bg-white overflow-auto px-4">
        {searcharray.map((element) => (
          <div
            key={element._id}
            className="w-[320px] md:w-auto md:flex flex-row md:gap-2 items-center justify-center md:border-gray-600 rounded-[5px] flex items-center shadow-md shadow-gray-400 pt-8 pl-2 pr-9 mb-4"
          >
            <div className="h-[80px] w-[80px] md:h-[165px] md:w-[165px] flex-shrink-0">
              <img src={element.imageurl} className="h-full w-full object-cover" />
            </div>

            <div className="pl-5 flex-1">
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

            <div className="flex flex-col ml-auto pr-4">
              <button
                className="!bg-white text-black shadow-md shadow-gray-500 !rounded-none" 
                onClick={()=>{Navigate(`/viewproduct?productname=${element.productname}&productid=${element._id}`,{state:element})}}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
