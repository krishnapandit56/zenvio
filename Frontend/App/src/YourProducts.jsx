import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function YourProducts() {
  const Navigate = useNavigate();
  const [array, setArray] = useState([]);
  const [username, setUsername] = useState("");

  // ✅ Fetch all products for this specific seller
  async function getData() {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      Navigate("/", { replace: true });
      return;
    }
    setUsername(storedUsername);

    console.log("Fetching products for:", storedUsername);

    let result = await fetch("https://zenvio-h5be.onrender.com/getdata", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: storedUsername }), // ✅ send username in body
    });

    const r = await result.json();
    setArray(r.result || []);
  }

  // ✅ Delete a product
  async function deleteProduct(id) {
    const confirmDelete = window.confirm(
      "Are You Sure You Want To Delete This Product?"
    );
    if (!confirmDelete) return;

    let result = await fetch("https://zenvio-h5be.onrender.com/deleteproduct", {
      method: "POST",
      body: JSON.stringify({ id }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const r = await result.json();
    if (r.deletestatus === 1) {
      alert("Product Deleted !!");
      getData(); // ✅ refresh without full reload
    } else {
      alert("An Error Occurred While Deleting Product !!");
    }
  }

  // ✅ On mount, fetch data
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center overflow-auto">
      <div className="h-[710px] w-screen flex flex-col gap-4 overflow-auto pl-5 pt-1 pr-5">
        <h1 className="text-black flex justify-center">
          Your Products ({username})
        </h1>
        {array.map((element) => (
          <div
            key={element._id}
            className="border-gray-600 rounded-[5px] flex items-center shadow-md shadow-gray-400 pt-3"
          >
            <div className="h-[165px] w-[165px] flex items-center pl-4">
              <img src={element.imageurl} alt={element.productname} />
            </div>

            <div className="pl-5 justify-center">
              <h2 className="text-black">
                <b>Product Name : </b>
                {element.productname}
              </h2>
              <h2 className="text-black">
                <b>Product ID : </b>
                {element._id}
              </h2>
              <h2 className="text-black">
                <b>Category : </b>
                {element.category}
              </h2>
              <h2 className="text-black">
                <b>Sub Category : </b>
                {element.subcategory}
              </h2>
              <h2 className="text-black">
                <b>Available Sizes : </b>
                {element.sizes?.join(", ")}
              </h2>
              <h2 className="text-black">
                <b>Material : </b>
                {element.material}
              </h2>
              <h2 className="text-black">
                <b>Price : </b>
                ₹{element.price}
              </h2>
              <h2 className="text-black">
                <b>Quantity : </b>
                {element.quantity}
              </h2>
              <h2 className="text-black">
                <b>Delivery Time : </b>
                {element.deliverytime} (Days)
              </h2>
              <h2 className="text-black">
                <b>Available In Cities : </b>
                {element.availablecities}
              </h2>
            </div>

            <div className="flex flex-col gap ml-auto pr-4 mb-27">
              <button
                className="!bg-white text-black shadow-md shadow-gray-500"
                onClick={() => deleteProduct(element._id)}
              >
                Delete
              </button>
              <br />
              <button
                className="!bg-white text-black shadow-md shadow-gray-500"
                onClick={() =>
                  Navigate("/Edit-Product", { state: element })
                }
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
