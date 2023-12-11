import React, { useState } from "react";

interface Props {
  options: number[];
}

const SwipeSelect: React.FC<Props> = ({
  options = new Array(40).fill(1).map((_, index) => index),
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    console.log(e);

    setSwipeDirection(null);
    const touch = e.touches[0];
    const startX = touch.clientX;
    const startY = touch.clientY;
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        setSwipeDirection(deltaX > 0 ? "right" : "left");
      }
    };
    document.addEventListener("touchmove", handleTouchMove, false);
    document.addEventListener(
      "touchend",
      () => {
        document.removeEventListener("touchmove", handleTouchMove);
      },
      false
    );
  };

  const handleOptionClick = (option: number) => {
    setSelectedOption(option);
  };

  return (
    <div className="relative overflow-hidden w-[400px]">
      <div
        className={`flex overflow-x-scroll ${
          swipeDirection === "left"
            ? "animate-slide-left"
            : "animate-slide-right"
        }`}
        onTouchStart={handleTouchStart}
      >
        {options.map((option) => (
          <div
            key={option}
            className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg cursor-pointer ${
              selectedOption === option ? "bg-blue-500" : "bg-gray-500"
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </div>
        ))}
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        {selectedOption !== null && (
          <div className="bg-blue-500 text-white px-4 py-2 rounded-full">
            You selected {selectedOption}
          </div>
        )}
      </div>
    </div>
  );
};

export default SwipeSelect;
