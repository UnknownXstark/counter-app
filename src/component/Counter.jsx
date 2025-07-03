import React from "react";
import "./Counter.css";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";

const Counter = () => {
  const [count, setCount] = useState(0);

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
