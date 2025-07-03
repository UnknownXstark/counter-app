import React, { useRef, useState } from "react";
import "./Counter.css";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [draggingOffset, setDraggingOffset] = useState({ x: 0, y: 0 });
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
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    setDraggingOffset({ x: deltaX, y: deltaY });
  };

  const handleTouchEnd = () => {
    handleGestureEnd();
  };

  //Mouse Handlers
  const handleMouseDown = (e) => {
    dragStart.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
  };

  const handleMouseMove = (e) => {
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;
    setDraggingOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    handleGestureEnd();

    window.removeEventListener("mouseup", handleMouseUp);
    windwow.removeEventListener("mousemove", handleMouseMove);
  };

  //Unified Gesture End Function
  const handleGestureEnd = () => {
    const { x, y } = dragOffset;

    if (Math.abs(x) > Math.abs(y)) {
      if (x > 30) {
        handleIncrease();
      } else if (x < -30) {
        handleDecrease();
      }
    } else {
      if (y > 30) {
        handleReset();
      }
    }
    setIsDragging(false);
    setDraggingOffset({ x: 0, y: 0 });
  };

  //Main Count Functions
  const handleIncrease = () => {
    setCount(count + 1);
  };
  const handleDecrease = () => {
    setCount(count - 1);
  };
  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="counter">
      <button onClick={handleDecrease}>
        <CgMathMinus />
      </button>
      <div
        className={`counter-box ${isDragging ? "dragging" : ""}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        <h2
          className={`count-display ${animate ? "bounce-slide" : ""}`}
          onAnimationEnd={() => setAnimate(false)}
        >
          {count}
        </h2>
      </div>
      <button onClick={handleIncrease}>
        <CgMathPlus />
      </button>
    </div>
  );
};

export default Counter;
