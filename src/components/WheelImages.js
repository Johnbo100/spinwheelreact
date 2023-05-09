import React, { useState } from 'react';

const WheelImages = ({ onImageSelect }) => {
  // Get all files in the images directory
  const images = require.context('../components/images', false, /\.(png|jpe?g|svg)$/);

  // Get an array of filenames from the images object
  const imageNames = images.keys().map(key => key.slice(2));
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageChange = (event) => {
    const imageName = event.target.value;
    setSelectedImage(imageName);
    onImageSelect(imageName);
  };

  return (
    <div>
      <label htmlFor="image-select">Select an image:</label>
      <select id="image-select" value={selectedImage} onChange={handleImageChange}>
        {imageNames.map(name => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
    </div>
  );
}

export default WheelImages;
