import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"


export default function YourProducts(){
    //=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/
    const Navigate = useNavigate()
    const [array,setarray]=useState([])

    ///////////////////////////////////////////////////////////////////
    async function getData(){
        console.log('get data called ')
        let result = await fetch('https://zenvio-h5be.onrender.com/getdata',{
            method:'post',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            }
        })

        const r = await result.json()
        setarray(r.result)
        

    }
////////////////////////////////////////////////////////////////////////

async function deleteproduct(id){

    const c = window.confirm('Are You Sure You Want To Delete This product ?')
    if(!c){
        return
    }

    let result = await fetch('https://zenvio-h5be.onrender.com/deleteproduct',{
            method:'post',
            body:JSON.stringify({id}),
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            }
        })

        const r = await result.json()
        if(r.deletestatus==1){
            alert('Product Deleted !!')
        }
        if(r.deletestatus==0){
            alert('An Error Occured While Deleting Product !!')
        }

        window.location.reload()

}

///////////////////////////////////////////////////////////////////////
    useEffect(()=>{
    getData()
},[])

    //=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/==//=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/
    return(
        <>
        <div className="h-screen w-screen bg-white flex items-center justify-center overflow-auto">
            <div className="h-[710px] w-screen flex flex-col gap-4 overflow-auto pl-5 pt-1 pr-5">
                <h1 className="text-black flex justify-center">Your Products</h1>
                {
                    array.map((element)=>(
                        
                            <div className=" border-gray-600 rounded-[5px] flex items-center shadow-md shadow-gray-400 pt-3">
                             <div className="h-[165px] w-[165px] flex items-center pl-4  ">
                                <img src={element.imageurl}></img>
                             </div>
                             
                                <div className="pl-5 justify-center">
                            <h2 className="text-black"><b>Product Name : </b>{element.productname}</h2>
                            <h2 className="text-black"><b>Product ID : </b>{element._id}</h2>
                            <h2 className="text-black"><b>Category : </b>{element.category}</h2>
                            <h2 className="text-black"><b>Sub Category : </b>{element.subcategory}</h2>
                            <h2 className="text-black"><b>Available Sizes : </b>{element.sizes.join(",")}</h2>{/*.join is array method of javascript which converts all elements of array in one string and seperates them by whatever symbol we give */}
                            <h2 className="text-black"><b>Material : </b>{element.material}</h2>
                            <h2 className="text-black"><b>Price : </b>{element.price}</h2>
                            <h2 className="text-black"><b>Quantity : </b>{element.quantity}</h2>
                            <h2 className="text-black"><b>Delivery Time : </b>{element.deliverytime} (Days)</h2>
                            <h2 className="text-black"><b>Available In Cities : </b>{element.availablecities}</h2>
                                </div>
                                <div className="flex flex-col gap ml-auto pr-4 mb-27">
                                <button className="!bg-white text-black shadow-md shadow-gray-500" onClick={()=>{deleteproduct(element._id)}}>Delete</button>
                                <br></br>
                                <button className="!bg-white text-black shadow-md shadow-gray-500" onClick={()=>{Navigate('/Edit-Product',{state:element})}}>Edit</button>
                                </div>
                        </div>
                        
                    ))
                }

            </div>
            

        </div>
        </>
    )
}