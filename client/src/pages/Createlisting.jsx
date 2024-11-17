import React, { useState } from 'react'




export default function Createlisting() {
    const [files,setfiles]= useState([]);
    const handleImageSubmit = async(e)=>{
        e.preventDefault();  // Prevent default form submission
        if(files.length>0 && files.length<4){
            const promises=[];

            for (let i=0;i<files.length;i++){
                promises.push(storeImage(files[i]));
            }
            try {
                // Wait for all uploads to finish
                const uploadedImages = await Promise.all(promises);
                console.log("Uploaded Images:", uploadedImages);
                // You can now use the uploaded image data as needed, e.g., save them to your database
              } catch (error) {
                console.error("Error uploading images:", error);
              }

        } else {
            alert("You can upload 1 to 3 images only.");
          }
    };
    // Upload image to Cloudinary directly from frontend
    const storeImage = async (file) => {
    const formData = new FormData();
    const cloudName = import.meta.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.REACT_APP_CLOUDINARY_PRESENT;

    formData.append('file', file);
    formData.append('upload_preset',uploadPreset);  // Replace with your Cloudinary upload preset
    formData.append('cloud_name', cloudName); // Replace with your Cloudinary cloud name

     // Log form data entries
    for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
    }
    try {
        // Directly uploading to Cloudinary's API endpoint
        const response = await fetch('https://api.cloudinary.com/v1_1/dxjujremp/image/upload', {
          method: 'POST',
          body: formData,
        });
        console.log("FormData:", formData);

  
        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Error uploading image');
        }
  
        const data = await response.json();  // The server will return the image details, e.g., the URL
        return data;
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw error;
      }   
        
    };
    
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create your profile</h1>
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
            <input type="text" placeholder='name'className='
            border p-3 rounded-lg 'id='name' maxLength='25' minLength='10'
            required/>
             <input type="text" placeholder='description'className='
            border p-3 rounded-lg 'id='description'
            required/>
             <input type="text" placeholder='address'className='
            border p-3 rounded-lg 'id='address' 
            required/>
        </div>
        <div className="flex flex-col flex-1 gap-4">
        <p className='font-semibold'>images:
            <span className='font-normal text-gray-600 ml-2'>you first image will be cover (max-3) </span>
        </p>
        <div className=' flex gap-4'>
            <input onChange={(e)=>setfiles(e.target.files)}
             className='p-3 border-gray-300 rounded w-full'
              type="file"id="image" 
              accept='image/*'
              multiple />
            <button type='button' onClick={handleImageSubmit} className='p-3 text-green-500 border border-green-600
            rounded uppercase hover:shadow-lg disabled:opacity-80'disabled={files.length === 0}>upload</button>
        </div>
        <button className='p-3 bg-slate-700 text-white rounded-lg uppercase
        hover:opacity-95 disabled:opacity-80'>create Profile</button>
        </div>
      </form>
    </main>
  )
}
