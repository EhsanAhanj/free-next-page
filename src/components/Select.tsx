// import React, { useState } from "react";
// import { useSwipeable } from "react-swipeable";

// const SwipeSelect: React.FC = () => {
//   const [activeIndex, setActiveIndex] = useState(5);
//   const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

//   // const handlers = {
//   //   onSwipedLeft: () => setActiveIndex((prev) => Math.min(prev + 1, items.length - 1)),
//   //   onSwipedRight: () => setActiveIndex((prev) => Math.max(prev - 1, 0)),
//   // };
//   const handlers = useSwipeable({
//     onSwipedUp: (eventData) => {
//       const distance = Math.abs(eventData.deltaY);
//       setActiveIndex((prev) => Math.max(prev - Math.floor(distance / 100), 0));
//     },
//     onSwipedDown: (eventData) => {
//       const distance = Math.abs(eventData.deltaY);
//       setActiveIndex((prev) =>
//         Math.min(prev + Math.floor(distance / 100), items.length - 1)
//       );
//     },
//     preventScrollOnSwipe: true,
//   });
//   return (
//     <div
//       {...handlers}
//       style={{ touchAction: "pan-y" }}
//       className="flex justify-center flex-col h-[100px] overflow-scroll"
//     >
//       <div
//         className="flex flex-col items-center transition-transform duration-500 ease-out"
//         style={{ transform: `translateY(-${activeIndex * 100}px)` }}
//       >
//         {items.map((item, index) => (
//           <div
//             key={item}
//             className={`px-4 py-2 m-1 text-center ${
//               index === activeIndex ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//           >
//             {item}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SwipeSelect;
