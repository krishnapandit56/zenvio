import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ViewProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const productid = searchParams.get("productid");
  const [product, setproduct] = useState({});
  const [seller, setseller] = useState({});
  const [cartstatus, setcartstatus] = useState("Add To Cart");

  useEffect(() => {
    async function fetchproduct() {
      const result = await fetch(`/viewproduct/${productid}`);
      let r = await result.json();
      setproduct(r.product);
      setseller(r.seller);
    }
    fetchproduct();
  }, [productid]);

  async function addtocart() {
    const result = await fetch("/addtocart", {
      method: "post",
      body: JSON.stringify({ productid: product._id }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let r = await result.json();
    setcartstatus(r.cartmessage);
  }

  return (
    <>
      {/* 🔸 Added top orange strip */}
<div className="fixed top-0 left-0 w-full bg-orange-100 text-center py-2 text-xl font-semibold text-gray-800 shadow-sm z-50">
  <h2 className="text-3xl"><b>ZENVIO</b> – showcase your style</h2>
</div>


      <div className="w-screen min-h-screen bg-white p-4 md:p-3 ">
        <div className="flex flex-col lg:flex-row gap-0 ">
          <div className="relative top-[300px] md:static w-full lg:w-1/3 flex items-center justify-center pt-80">
            <img
              src={product.imageurl}
              alt={product.productname}
              className="max-h-[500px] object-contain"
            />
          </div>

          <div className="text-black w-full lg:w-2/3 flex flex-col gap-2 pt-85 ">
            <h2 className="text-black text-4xl">
              <b>{product.productname}</b>
            </h2>
            <h2 className="text-red-500 text-3xl w-fit flex items-center rounded-[5px] ">
              <b>{product.price} ₹</b>
            </h2>
            <div className="flex flex-row gap-4">
              <button
                onClick={() => {
                  navigate(`/Buy?productname=${product.productname}&productid=${productid}`, {
                    state: product,
                  });
                }}
                className="!bg-yellow-500 hover:!bg-yellow-700"
              >
                Buy Now
              </button>
              <button
                className="!bg-yellow-300 hover:!bg-yellow-500"
                onClick={() => {
                  addtocart();
                }}
              >
                {cartstatus}
              </button>
            </div>

            <div className="rounded-2xl  flex justify-center flex-col gap-1 pt-5 pb-5 pl-5 bg-gradient-to-r from-orange-100 to-white ">
              <h2 className="text-gray-700 text-2xl font-bold">About Product</h2>
              <h2 className="text-black text-md">
                <b>Product Id :</b> {product._id}
              </h2>
              <h2 className="text-black text-md">
                <b>Category :</b> {product.category}
              </h2>
              <h2 className="text-black text-md">
                <b>Sub Category :</b> {product.subcategory}
              </h2>
              <h2 className="text-black text-md">
                <b>Material :</b> {product.material}
              </h2>
              <h2 className="text-black text-md">
                <b>Available Sizes :</b>{" "}
                {Array.isArray(product.sizes) && product.sizes.length > 0
                  ? product.sizes.join(" , ")
                  : "NA"}
              </h2>
            </div>

            <div className="rounded-2xl flex justify-center flex-col gap-1 pt-5 pb-5 pl-5 bg-gradient-to-r from-orange-100 to-white">
              <h2 className="text-gray-700 text-2xl font-bold">Other Details</h2>
              <h2 className="text-black text-md">
                <b>Available Quantity :</b> {product.quantity}
              </h2>
              <h2 className="text-black text-md">
                <b>Available Cities :</b> {product.availablecities}
              </h2>
              <h2 className="text-black text-md">
                <b>Delivery Time :</b> {product.deliverytime} (Days)
              </h2>
            </div>

            <div className="rounded-2xl flex justify-center flex-col gap-1 pt-5 pb-5 pl-5 bg-gradient-to-r from-orange-100 to-white">
              <h2 className="text-gray-700 text-2xl font-bold">Seller Information </h2>
              <h2 className="text-black text-md">
                <b>Store Name :</b> {seller.storename || "N/A"}
              </h2>
              <h2 className="text-black text-md">
                <b>State :</b> {seller.state || "N/A"}
              </h2>
              <h2 className="text-black text-md">
                <b>City :</b> {seller.city}
              </h2>
              <h2 className="text-black text-md">
                <b>Address :</b> {seller.address}
              </h2>
              <h2 className="text-black text-md">
                <b>Email:</b> {seller.email}
              </h2>
            </div>
          </div>
        </div>
        <div className="pb-10"></div>
      </div>
    </>
  );
}
