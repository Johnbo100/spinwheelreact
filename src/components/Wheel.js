import React, { useState, useEffect } from "react";
import roulette from "../components/images/roulette.png";
import onetotwentyfive from "../components/images/1to25.png";
import colors from "../components/images/colors.png";

const Wheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [spinTime, setSpinTime] = useState(5);

  useEffect(() => {
    let intervalId;
    if (isSpinning) {
      intervalId = setInterval(() => {
        setRotationAngle((angle) => angle + 2);
      }, 20);
    }
    return () => clearInterval(intervalId);
  }, [isSpinning]);

  const startSpinning = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
    }, spinTime); // 5000 milliseconds = 5 seconds
  };

  const stopSpinning = () => {
    setIsSpinning(false);
  };

  const handleImageSelect = (e) => {
    setSelectedImage(e.target.value);
  };

  return (
    <div className="container">
      <div style={{ position: "relative" }}>
        <img
          alt="WheelImage"
          src={selectedImage}
          className="wheel-image"
          style={{ transform: `rotate(${rotationAngle}deg)` }}
        />
        {isSpinning && <div className="ticker"></div>}
        {!isSpinning && <div className="static-ticker"> </div>}
      </div>

      <div className="controls">
        <select onChange={handleImageSelect}>
          <option value={roulette}>Roulette</option>
          <option value={onetotwentyfive}>1 to 25</option>
          <option value={colors}>Colors</option>
        </select>

        <input
          type="number"
          onChange={(e) => setSpinTime(Number(e.target.value) * 1000)}
        />
        <button className="startbtn" onClick={startSpinning}>Start spinning</button>
        <button className="stopbtn" onClick={stopSpinning}>Stop spinning</button>
      </div>
      
    </div>
  );
};

export default Wheel;
