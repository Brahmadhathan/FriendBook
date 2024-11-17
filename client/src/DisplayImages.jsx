import React, { useEffect, useState } from 'react';

const DisplayImages = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/images');
        
        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        
        const data = await response.json();
        setImages(data.images);
      } catch (error) {
        console.error('Error fetching images:', error.message);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      {images.length > 0 ? (
        images.map((img, idx) => (
          <div key={idx}>
            <img src={img.url} alt={img.filename} style={{ width: '200px' }} />
          </div>
        ))
      ) : (
        <p>No images to display</p>
      )}
    </div>
  );
};

export default DisplayImages;
