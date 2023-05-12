import React, { useState, useEffect } from "react";
import roulette from "../components/images/roulette.png";
import onetotwentyfive from "../components/images/1to25.png";
import colors from "../components/images/colors.png";
import wheel2 from "../components/images/wheel2.png"
import spin10to100 from "../components/images/spin10-100.png"
import twister from "../components/images/twister.png"

const Wheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [selectedImage, setSelectedImage] = useState(roulette);
  const [spinTime, setSpinTime] = useState(9000);

  
  
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
          onClick={startSpinning}
        />
        {isSpinning && <div className="ticker"></div>}
        {!isSpinning && <div className="static-ticker"> </div>}
        <div className="selectwheel">
        <select onChange={handleImageSelect}>
          <option value={roulette}>Roulette</option>
          <option value={onetotwentyfive}>1 to 25</option>
          <option value={colors}>Colors</option>
          <option value={wheel2}>Wheel2</option>
          <option value={spin10to100}>10-100</option>
          <option value={twister}>Twister</option>
        </select>
        </div>
      </div>

      
      
    </div>
  );
};

export default Wheel;
