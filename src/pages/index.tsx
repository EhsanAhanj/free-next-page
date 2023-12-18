import SwipeSelect from "@/components/DatePicker";
import MyComponent from "@/components/MyComponent";
import { useState } from "react";

const App = () => {
  const date = new Date();
  const [startDate, setStartDate] = useState(date);

  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };

  return (
    <div>
      {/* <SwipeSelect startDate={startDate} setStartDate={setStartDate} /> */}
      <MyComponent
        onRecordingComplete={(blob) => addAudioElement(blob)}
        // audioTrackConstraints={{
        //   noiseSuppression: true,
        //   echoCancellation: true,
        // }}
        onNotAllowedOrFound={(err) => console.table(err)}
        showVisualizer={true}
        downloadOnSavePress
        downloadFileExtension="mp3"
      />{" "}
    </div>
  );
};

export default App;
