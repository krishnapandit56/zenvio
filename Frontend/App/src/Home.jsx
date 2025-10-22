import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Persist username: use state from location or fallback to localStorage
  const [username, setUsername] = useState(
    location.state || localStorage.getItem("username") || ""
  );

  const [searchText, setSearchText] = useState("");
  const [searchArray, setSearchArray] = useState([]);
  const [recentArray, setRecentArray] = useState([]);

  // Store username in localStorage after login/navigation
  useEffect(() => {
    if (username) localStorage.setItem("username", username);
  }, [username]);

  // --- Fetch recent searches
  const fetchRecentSearch = async () => {
    try {
      const res = await fetch(
        "https://zenvio-h5be.onrender.com/fetchrecentsearch",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      setRecentArray(data.products || []);
    } catch (err) {
      console.error("Error fetching recent searches:", err);
    }
  };

  // --- Fetch search results
  const fetchSearch = async (query) => {
    if (!query) return;

    try {
      const res = await fetch(
        `https://zenvio-h5be.onrender.com/searchproduct?searchtext=${encodeURIComponent(
          query
        )}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      setSearchArray(data.searchproduct || []);

      // Add to recent searches
      await fetch("https://zenvio-h5be.onrender.com/addrecentsearch", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: query }),
      });
    } catch (err) {
      console.error("Error searching products:", err);
    }
  };

  // --- Run search when URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("searchtext") || "";
    setSearchText(query);
    if (query) fetchSearch(query);
  }, [location.search]);

  // --- Fetch recent searches on mount
  useEffect(() => {
    fetchRecentSearch();
  }, []);

  // --- Handle search button click
  const handleSearch = () => {
    navigate(`/Home?searchtext=${encodeURIComponent(searchText)}`, {
      state: username,
    });
  };

  // --- Logout
  const logout = async () => {
    try {
      await fetch("https://zenvio-h5be.onrender.com/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("username");
      navigate("/", { replace: true });
    }
  };

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
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-[250px] absolute left-[120px] md:relative md:left-auto md:w-auto md:flex-1 h-10 px-3 border border-gray-300 rounded-l-md focus:outline-none !bg-white text-black"
            />
            <button
              onClick={handleSearch}
              className="relative left-[350px] md:static md:top-auto md:h-10 w-12 bg-orange-400 flex items-center justify-center rounded-r-md hover:bg-orange-500 transition"
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

        {/* Right buttons */}
        <div className="hidden md:flex md:w-[380px] space-x-1 fixed top-0 right-1 h-[72px]">
          <button
            onClick={() => navigate("/yourcart", { state: username })}
            className="w-[100px] bg-orange-200 text-gray-700 hover:bg-orange-100 transition"
          >
            Your Cart
          </button>
          <button
            onClick={() => navigate("/YourOrders", { state: username })}
            className="w-[100px] bg-orange-200 text-gray-700 hover:bg-orange-100 transition"
          >
            Your Orders
          </button>
          <button className="w-[100px] bg-orange-200 text-gray-700">{username}</button>
          <button
            onClick={logout}
            className="w-[100px] bg-orange-300 text-gray-700 hover:bg-orange-100 transition"
          >
            Logout
          </button>
        </div>

      </nav>

      {/* Main content */}
      <div className="relative top-[100px] pb-4 md:w-screen h-[601.5px] bg-white overflow-auto scroll-smooth px-4">
        {searchText.length > 0
          ? searchArray.map((el) => (
              <div
                key={el._id}
                className="w-[320px] md:w-auto flex flex-row gap-2 items-center shadow-md mb-4 p-2 cursor-pointer"
                onClick={() =>
                  navigate(
                    `/viewproduct?productname=${el.productname}&productid=${el._id}`,
                    { state: el }
                  )
                }
              >
                <img
                  src={el.imageurl}
                  className="h-[80px] w-[80px] md:h-[165px] md:w-[165px] object-cover"
                />
                <div className="pl-5 flex-1">
                  <h2>
                    <b>Product Name:</b> {el.productname}
                  </h2>
                  <h2>
                    <b>Category:</b> {el.category}
                  </h2>
                  <h2>
                    <b>Sub Category:</b> {el.subcategory}
                  </h2>
                  <h2>
                    <b>Price:</b> ₹{el.price}
                  </h2>
                </div>
              </div>
            ))
          : recentArray.map((el) => (
              <div
                key={el._id}
                className="w-[320px] md:w-auto flex flex-row gap-2 items-center shadow-md mb-4 p-2 cursor-pointer"
                onClick={() =>
                  navigate(
                    `/viewproduct?productname=${el.productname}&productid=${el._id}`,
                    { state: el }
                  )
                }
              >
                <img
                  src={el.imageurl}
                  className="h-[80px] w-[80px] md:h-[165px] md:w-[165px] object-cover"
                />
                <div className="pl-5 flex-1">
                  <h2>
                    <b>Product Name:</b> {el.productname}
                  </h2>
                  <h2>
                    <b>Category:</b> {el.category}
                  </h2>
                  <h2>
                    <b>Sub Category:</b> {el.subcategory}
                  </h2>
                  <h2>
                    <b>Price:</b> ₹{el.price}
                  </h2>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
