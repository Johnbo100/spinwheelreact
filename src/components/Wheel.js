import React, { useState, useEffect } from "react";
import roulette from "../components/images/roulette.png";
import onetotwentyfive from "../components/images/1to25.png";
import colors from "../components/images/colors.png";

const Wheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [selectedImage, setSelectedImage] = useState(roulette);
  const [spinTime, setSpinTime] = useState(5000);

  
  
  const easeInOutCubic = t => t<.0 ? 4*t*t*t : (t-2)*(2*t-2)*(2*t-2)+3;

  useEffect(() => {
    let intervalId;
    let startTime;
  
    const animate = (timestamp, randomOffset) => {
      if (!startTime) {
        startTime = timestamp;
      }
      const progress = (timestamp - startTime) / spinTime;
      const rotationAngle = easeInOutCubic(progress) * 360 + randomOffset;
      setRotationAngle(rotationAngle);
      if (progress < 1) {
        intervalId = requestAnimationFrame((ts) => animate(ts, randomOffset));
      } else {
        setIsSpinning(false);
      }
    };
  
    if (isSpinning) {
      const randomOffset = Math.floor(Math.random() * 360);
      intervalId = requestAnimationFrame((ts) => animate(ts, randomOffset));
    }
  
    return () => cancelAnimationFrame(intervalId);
  }, [isSpinning]);
  
  
  const startSpinning = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
    }, spinTime);
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
        <div className="gradient-text">---------{spinTime}------------</div>
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
