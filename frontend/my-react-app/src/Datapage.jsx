import React, { useEffect, useState } from 'react'

function Datapage() {
    const [data,setData] = useState([])

    const [editId,setEditId] = useState(null);
    const [editUsername, setEditUsername] = useState("");
    const [editNumber, setEditNumber] = useState("");
    const [editImage,setEditImage] = useState(null);


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
        setEditImage(null);
    }

    const handleCancel = ()=>{
      setEditId(null);
      setEditUsername("");
      setEditNumber("");
      setEditImage(null);
    }

    const handleSave = (id)=>{

        const formData = new FormData();

        formData.append("username",editUsername);
        formData.append("number",Number(editNumber));

        if(editImage){
            formData.append("image",editImage);
        }

        fetch(`http://localhost:5000/data/${id}`,{
            method: "PUT",
            
            body : formData,
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
        <div className="bg-white p-8 rounded-xl shadow-lg w-[1000px]">
        <h1 className="text-3xl fond-bold text-blue-600 text-center mb-6 ">Data From MongoDB</h1>
        <div className="space-y-4 max-h-[750px] overflow-y-auto">
    {data.map((i) => (
    <div key={i._id}  className="group border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-md hover:shadow-xl hover:bg-sky-200 transition-all duration-300 ">
      
     

      {editId === i._id ? (

        <div className="space-y-3">

            <div className="flex gap-6 items-center">
                <div className="w-[300px] flex-shrink-0">


           {i.image && (
        <img src={`http://localhost:5000/uploads/${i.image}`}
        alt={i.username}
        className="w-full h-48 object-cover rounded-lg mb-4"/>
      )}
      </div>
      <div className="flex-1 space-y-3">
            <input type="text" placeholder="Username" value={editUsername} onChange={(e)=>setEditUsername(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2"/>
        <input type="number" placeholder="enter number" value={editNumber} onChange={(e)=>setEditNumber(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
       {/* Change Image */} <div> <label className="block text-sm font-semibold text-gray-700 mb-1"> Change Image </label> <input type="file" accept="image/*" onChange={(e) => setEditImage(e.target.files[0]) } className="w-full border border-gray-300 rounded-lg px-4 py-2" /> </div>
        <div className="flex gap-2">
        <button onClick={()=>handleSave(i._id)}  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Save</button>
        <button onClick={handleCancel}  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Cancel</button>

        </div>
            </div>
            </div>
            </div>
      ) : (

 <div className="grid grid-cols-3 gap-6 items-center">

    {/* LEFT - IMAGE */}
    <div>
       {i.image && ( 
        <img src={`http://localhost:5000/uploads/${i.image}`} alt={i.username} className="w-full h-48 object-cover rounded-lg mb-4" />
         )}
        </div>
           {/* RIGHT - DATA */}
    <div>
        <p className="text-lg mb-2 text-gray-700 group-hover:text-black">
            <span className="font-bold  ">Username:</span>{" "}
      {i.username}
       </p>
        <p className="text-lg text-gray-700 group-hover:text-black">
            <span className="font-bold ">Number:</span>{" "}
      {i.number}</p>
      </div>

      <div className="flex flex-col gap-3">

        <button onClick={()=>handleEdit(i)}  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-pink-500 hover:text-black">Edit</button>

        <button onClick={()=>handleDelete(i._id)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-pink-500 hover:text-black">Delete</button>



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