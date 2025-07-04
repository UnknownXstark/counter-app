import React, { useRef, useState } from "react";
import "./Counter.css";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });
  const touchStart = useRef({ x: 0, y: 0 });

  //Touch Handlers
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const maxX = 60;
    const maxY = 60;
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    const limitedX = Math.max(Math.min(deltaX, maxX), -maxX);
    const limitedY = Math.max(Math.min(deltaY, maxY), -maxY);
    setDragOffset({ x: limitedX, y: limitedY });
  };

  const handleTouchEnd = () => {
    handleGestureEnd();
  };

  //Mouse Handlers
  const handleMouseDown = (e) => {
    dragStart.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const maxX = 60;
    const maxY = 60;
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;
    const limitedX = Math.max(Math.min(deltaX, maxX), -maxX);
    const limitedY = Math.max(Math.min(deltaY, maxY), -maxY);
    setDragOffset({ x: limitedX, y: limitedY });
  };

  const handleMouseUp = () => {
    handleGestureEnd();
  };

  //Unified Gesture End Function
  const handleGestureEnd = () => {
    const { x, y } = dragOffset;
    const swipeThresholdX = 50;
    const swipeThresholdY = 50;

    if (Math.abs(x) > Math.abs(y) && Math.abs(x) > swipeThresholdX) {
      if (x > 70) {
        handleIncrease();
        setAnimate(true);
      } else {
        handleDecrease();
        setAnimate(true);
      }
    } else if (Math.abs(y) > swipeThresholdY && y > 0) {
      handleReset();
      setAnimate(true);
    }

    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  //Main Count Functions
  const handleIncrease = () => {
    setCount((prev) => prev + 1);
  };
  const handleDecrease = () => {
    setCount((prev) => prev - 1);
  };
  const handleReset = () => {
    setCount(0);
  };

  return (
    <div
      className="counter"
      onMouseMove={isDragging ? handleMouseMove : undefined}
      onMouseUp={isDragging ? handleMouseUp : undefined}
    >
      <button onClick={handleDecrease} aria-label="decrease">
        <CgMathMinus />
      </button>
      <div
        className={`counter-box ${isDragging ? "dragging" : ""}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        style={{
          transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${
            dragOffset.x * 0.2
          }deg)`,
          transition: isDragging ? "none" : "transform 0.2s ease-out",
        }}
      >
        <h2
          className={`count-display ${animate ? "bounce-slide" : ""}`}
          onAnimationEnd={() => setAnimate(false)}
        >
          {count}
        </h2>
      </div>
      <button onClick={handleIncrease} aria-label="increase">
        <CgMathPlus />
      </button>
    </div>
  );
};

export default Counter;
