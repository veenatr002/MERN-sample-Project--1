import React, { useState } from 'react'

function Formpage() {
    const [username,setUsername] = useState("");
    const [number,setNumber] = useState("");
    const [image,setImage] = useState(null);

    const handlesubmit= (e)=>
    {
        e.preventDefault();

        const formData = new FormData();

        formData.append("username",username);
        formData.append("number",number);
        formData.append("image",image)

        fetch("http://localhost:5000/data",{
            method: "POST",
            
            body : formData,
        })
        .then((res)=>res.text())
        .then((result)=>
            {
                alert(result);
                setNumber("");
                setUsername("");
                setImage(null);
    })
    .catch((error)=>
    {
        console.log(error);
        alert("something went wrong");
    })

    }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="bg-white p-8 rounded-xl shadow-lg w-[400px] h-[400px] transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
<h2 className="text-4xl font-bold text-blue-600 mb-6">Enter Data</h2>
{/* <form action="http://localhost:5000/data" method="POST">
      <input type="text"  name="username" placeholder="Email Here"/>
      <input type="number" name="number" placeholder="Enter Number" />
      <button type="submit">Submit</button>
    </form> */}
    <form onSubmit={handlesubmit} className="space-y-4">
        <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2"/>
        <input type="number" placeholder="enter number" value={number} onChange={(e)=>setNumber(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
        {/* <input type="file" id="imageInput" accept="image/*" onChange={(e)=> setImage(e.target.files[0])} className="w-full border border-gray-300 rounded-lg px-4 py-2" /> */}

        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
  <label
    htmlFor="imageInput"
    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 cursor-pointer font-medium"
  >
    Choose File
  </label>

  <span className="px-4 py-2 text-gray-500">
    {image ? image.name : "No file chosen"}
  </span>

  <input
    type="file"
    id="imageInput"
    accept="image/*"
    onChange={(e) => setImage(e.target.files[0])}
    className="hidden"
  />
</div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Submit</button>
    </form>

    </div>
    </div>
  )
}

export default Formpage