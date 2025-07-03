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

  //Main Count Functions
  const handleIncrease = () => {
    setCount(count + 1);
  };
  const handleDecrease = () => {
    setCount(count - 1);
  };

  return (
    <div className="counter">
      <button onClick={handleDecrease}>
        <CgMathMinus />
      </button>
      <div className="counter-box">
        <h2>{count}</h2>
      </div>
      <button onClick={handleIncrease}>
        <CgMathPlus />
      </button>
    </div>
  );
};

export default Counter;
