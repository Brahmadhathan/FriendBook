import React, { useState } from 'react';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      // Check if the response is ok (status code in the range 200-299)
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      const data = await res.json();
      setResponseMessage(data.message || 'Image uploaded successfully!');
    } catch (error) {
      setResponseMessage(error.message || 'Upload failed');
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" style={{ width: '200px' }} />}
      <button onClick={handleUpload}>Upload Image</button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default UploadImage;
