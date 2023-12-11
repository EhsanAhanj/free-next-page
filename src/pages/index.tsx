import SwipeSelect from "@/components/DatePicker";
import { useState } from "react";

const App = () => {
  const date = new Date();
  const [startDate, setStartDate] = useState(date);
  return (
    <div>
      <SwipeSelect startDate={startDate} setStartDate={setStartDate} />
    </div>
  );
};

export default App;
