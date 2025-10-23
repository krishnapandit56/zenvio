import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  const Navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [searchtext, setSearchtext] = useState("");
  const [searcharray, setSearcharray] = useState([]);
  const [recentarray, setrecentarray] = useState([]);

  // Load username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      Navigate("/", { replace: true }); // redirect if not logged in
    }
  }, []);

  // Fetch search results
  async function fetchsearch(query) {
    try {
      const result = await fetch(
        `https://zenvio-h5be.onrender.com/searchproduct?searchtext=${encodeURIComponent(
          query
        )}`,
        {
          method: "post",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const r = await result.json();
      setSearcharray(r.searchproduct || []);

      if (query && query.trim() !== "") {
        await fetch("https://zenvio-h5be.onrender.com/addrecentsearch", {
          method: "post",
          credentials: "include",
          body: JSON.stringify({ keyword: query }),
          headers: { "Content-Type": "application/json" },
        });
      }
    } catch (err) {
      console.error("Error fetching search:", err);
    }
  }

  // Fetch recent searches
  async function fetchrecentsearch() {
    try {
      const result = await fetch(
        "https://zenvio-h5be.onrender.com/fetchrecentsearch",
        {
          method: "post",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const r = await result.json();
      if (Array.isArray(r.products)) setrecentarray(r.products);
      else setrecentarray([]);
    } catch (err) {
      console.error("Error fetching recent searches:", err);
      setrecentarray([]);
    }
  }

  useEffect(() => {
    fetchrecentsearch();
  }, []);

  // Run search when URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("searchtext") || "";
    setSearchtext(query);
    fetchsearch(query);
  }, [location.search]);

  // Navigate on search
  function search() {
    Navigate(`/Home?searchtext=${encodeURIComponent(searchtext)}`, {
      state: username,
    });
  }

  // Logout
  async function logout() {
    try {
      await fetch("https://zenvio-h5be.onrender.com/logout", {
        method: "post",
        credentials: "include",
      });
      Navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  return (
    <div className="min-h-screen max-w-screen bg-gray-50 overflow-x-hidden overflow-y-auto">
      {/* Navbar */}
      <nav className="w-[300px] flex items-center justify-center md:flex md:flex-row gap-10 md:fixed md:w-full top-0 bg-orange-100 shadow-sm px-6 py-3">
        <div className="relative md:static md:flex-shrink-0 text-5xl font-extrabold text-gray-800 tracking-wide">
          ZENVIO
        </div>

        {/* Search bar */}
        <div className="relative top-[120px] left-[50px] md:static md:top-auto flex-1 flex justify-center mx-4 flex-shrink-0">
          <div className="!flex-shrink-0 flex w-[600px] relative right-[100px]">
            <input
              type="text"
              placeholder="Search clothing..."
              value={searchtext}
              onChange={(e) => setSearchtext(e.target.value)}
              className="w-[250px] absolute left-[120px] md:relative md:left-auto md:w-auto md:flex-1 h-10 px-3 border border-gray-300 rounded-l-md focus:outline-none !bg-white text-black"
            />
            <button
              onClick={search}
              className="relative left-[350px] md:static md:top-auto md:h-10 w-12 bg-orange-400 flex items-center justify-center rounded-r-md hover:bg-orange-500 transition"
            >
              🔍
            </button>
          </div>
        </div>

        {/* Right buttons */}
        <div className="hidden md:flex md:w-[380px] space-x-1 fixed top-0 right-1 h-[72px]">
          <button
            onClick={() => Navigate("/yourcart", { state: username })}
            className="w-[100px] bg-orange-200 text-gray-700 hover:bg-orange-100"
          >
            Your Cart
          </button>
          <button
            onClick={() => Navigate("/YourOrders", { state: username })}
            className="w-[100px] bg-orange-200 text-gray-700 hover:bg-orange-100"
          >
            Your Orders
          </button>
          <button className="w-[100px] bg-orange-200 text-gray-700">{username}</button>
          <button
            onClick={logout}
            className="w-[100px] bg-orange-300 text-gray-700 hover:bg-orange-100"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Search results */}
      <div className="relative top-[100px] text-sm pb-4 md:w-screen h-[601.5px] bg-white overflow-auto scroll-smooth px-4">
        {searcharray.map((element) => (
          <div
            key={element._id}
            className="w-[320px] md:flex flex-row gap-2 items-center justify-center rounded-[5px] shadow-md pt-8 pl-2 pr-9 mb-4 cursor-pointer"
            onClick={() =>
              Navigate(
                `/viewproduct?productname=${element.productname}&productid=${element._id}`,
                { state: element }
              )
            }
          >
            <img
              src={element.imageurl}
              className="h-[80px] w-[80px] md:h-[165px] md:w-[165px] object-cover flex-shrink-0"
            />
            <div className="pl-5 flex-1 pb-3">
              <h2>Product Name: {element.productname}</h2>
              <h2>Product ID: {element._id}</h2>
              <h2>Category: {element.category}</h2>
              <h2>Sub Category: {element.subcategory}</h2>
              <h2>Sizes: {element.sizes.join(", ")}</h2>
              <h2>Material: {element.material}</h2>
              <h2>Price: ₹{element.price}</h2>
              <h2>Quantity: {element.quantity}</h2>
              <h2>Delivery Time: {element.deliverytime} Days</h2>
              <h2>Available Cities: {element.availablecities}</h2>
            </div>
          </div>
        ))}

        {searchtext.length === 0 && recentarray.length > 0 && (
          <>
            <h2 className="text-gray-700 text-3xl font-semibold mb-4">
              Based On Your Recent Search History
            </h2>
            {recentarray.map((element) => (
              <div
                key={element._id}
                className="w-[320px] md:flex flex-row gap-2 items-center justify-center rounded-[5px] shadow-md pt-8 pl-2 pr-9 mb-4 cursor-pointer"
                onClick={() =>
                  Navigate(
                    `/viewproduct?productname=${element.productname}&productid=${element._id}`,
                    { state: element }
                  )
                }
              >
                <img
                  src={element.imageurl}
                  className="h-[80px] w-[80px] md:h-[165px] md:w-[165px] object-cover flex-shrink-0"
                />
                <div className="pl-5 flex-1 pb-3">
                  <h2>Product Name: {element.productname}</h2>
                  <h2>Product ID: {element._id}</h2>
                  <h2>Category: {element.category}</h2>
                  <h2>Sub Category: {element.subcategory}</h2>
                  <h2>Sizes: {element.sizes.join(", ")}</h2>
                  <h2>Material: {element.material}</h2>
                  <h2>Price: ₹{element.price}</h2>
                  <h2>Quantity: {element.quantity}</h2>
                  <h2>Delivery Time: {element.deliverytime} Days</h2>
                  <h2>Available Cities: {element.availablecities}</h2>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
