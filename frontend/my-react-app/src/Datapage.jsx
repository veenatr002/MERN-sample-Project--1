import React, { useEffect, useState } from 'react'

function Datapage() {
    const [data,setData] = useState([])

    useEffect(()=>
    {
        fetch("http://localhost:5000/data")
        .then((res)=>
        {
            return res.json();
            

        })
        .then((result)=>{
            setData(result);

        })
        .catch((error)=>
        {
            console.log(error)
        })
    },[])


  return (
    <div className="min-h-screen bg-gray-600 p-6 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">
        <h1 className="text-3xl fond-bold text-blue-600 text-center mb-6 ">Data From MongoDB</h1>
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
    {data.map((i) => (
    <div key={i._id}  className="group border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-md hover:shadow-xl hover:bg-blue-500 transition-all duration-300 ">
        <p className="text-lg mb-2 text-gray-700 group-hover:text-white">
            <span className="font-bold  ">Username:</span>{" "}
      {i.username}
       </p>
        <p className="text-lg text-gray-700 group-hover:text-white">
            <span className="font-bold ">Number:</span>{" "}
      {i.number}</p>
    </div>
))}
</div>
    </div>
    </div>
  )
}

export default Datapage