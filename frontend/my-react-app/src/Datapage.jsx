import React, { useEffect, useState } from 'react'

function Datapage() {
    const [data,setData] = useState([])

    const [editId,setEditId] = useState(null);
    const [editUsername, setEditUsername] = useState("");
    const [editNumber, setEditNumber] = useState("");


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
    },[]);


    // Editing

    const handleEdit= (i)=>{
        setEditId(i._id);
        setEditUsername(i.username);
        setEditNumber(i.number);
    }

    const handleCancel = ()=>{
      setEditId(null);
      setEditUsername("");
      setEditNumber("");
    }

    const handleSave = (id)=>{
        fetch(`http://localhost:5000/data/${id}`,{
            method: "PUT",
            headers : {"content-Type" :"application/json"},
            body : JSON.stringify({
                username:editUsername,
                number:Number(editNumber),
            }),
        })
        .then((res)=>{
            if(!res.ok){
                throw new Error("updation failed")
            }
            return res.json();
        })
        .then((updatedData)=>{

            setData(
                data.map((item)=>
                    item._id === id ? updatedData : item
                )
            );
            handleCancel();
            alert("Data Updated Successfull!!!!");
        })
        .catch((error)=>{
            console.log(error);
            alert("something went wrong")
        })

    }


    const handleDelete = (id) => {
        const confirmDelete = window.confirm( "Are you sure you want to delete this data?"
        );
        if(!confirmDelete){
            return;
        }
          fetch(`http://localhost:5000/data/${id}`,{
            method: "DELETE",
            
        })
        .then((res)=>{
            return res.text();

        })
        .then((result)=>
        {
            setData(data.filter((item)=> item._id !== id));
            alert(result);
        })
        .catch((error)=> {
            console.log(error);
            alert("something went wrong");
        })
    }


  return (
    <div className="min-h-screen bg-gray-600 p-6 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">
        <h1 className="text-3xl fond-bold text-blue-600 text-center mb-6 ">Data From MongoDB</h1>
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
    {data.map((i) => (
    <div key={i._id}  className="group border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-md hover:shadow-xl hover:bg-blue-500 transition-all duration-300 ">
      
      

      {editId === i._id ? (

        <div className="space-y-3">


            <input type="text" placeholder="Username" value={editUsername} onChange={(e)=>setEditUsername(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2"/>
        <input type="number" placeholder="enter number" value={editNumber} onChange={(e)=>setEditNumber(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
        
        <div className="flex gap-2">
        <button onClick={()=>handleSave(i._id)}  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Save</button>
        <button onClick={handleCancel}  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Cancel</button>

        </div>
            </div>
      ) : (

<div>
        
        <p className="text-lg mb-2 text-gray-700 group-hover:text-white">
            <span className="font-bold  ">Username:</span>{" "}
      {i.username}
       </p>
        <p className="text-lg text-gray-700 group-hover:text-white">
            <span className="font-bold ">Number:</span>{" "}
      {i.number}</p>

      <div className="flex gap-2">

        <button onClick={()=>handleEdit(i)}  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Edit</button>

        <button onClick={()=>handleDelete(i._id)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Delete</button>



      </div>
    
    </div>
)}
</div>
))}
</div>
</div>
</div>
    

    
    
  )
}

export default Datapage