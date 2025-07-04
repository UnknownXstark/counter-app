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
    lastPosition.current = { x: e.clientX, y: e.clientY };
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
    lastPosition.current = { x: e.clientX, y: e.clientY };
    setDragOffset({ x: limitedX, y: limitedY });
  };

  const handleMouseUp = () => {
    handleGestureEnd();
  };

  //Unified Gesture End Function
  const handleGestureEnd = () => {
    const elementUnderCursor = document.elementFromPoint(
      lastPosition.current.x,
      lastPosition.current.y
    );

    const button = elementUnderCursor?.closest("button");
    if (button?.getAttribute("aria-label") === "increase") {
      handleIncrease();
    } else if (button?.getAttribute("aria-label") === "decrease") {
      handleDecrease();
    }
    const { x, y } = dragOffset;

    if (Math.abs(x) > Math.abs(y)) {
      if (x > 70) {
        handleIncrease();
      } else if (x < -70) {
        handleDecrease();
      }
    } else {
      if (y > 30) {
        console.log("swipe down triggered reset");

        handleReset();
      }
    }
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
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
      <button onClick={handleDecrease} aria-label="decrease">
        <CgMathMinus />
      </button>
      <div
        className={`counter-box ${isDragging ? "dragging" : ""}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        // onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${
            dragOffset.x * 0.2
          }deg)`,
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
