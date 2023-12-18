import AudioReactRecorder, {
  RecordState,
} from "@/components/AudioReactRecorder2";
// import SwipeSelect from "@/components/DatePicker";
import { useState } from "react";

const App = () => {
  const [audioSrc, setAudioSrc] = useState();
  const [recordState, setRecordState] = useState<any>(RecordState.NONE);
  const start = () => {
    setRecordState(RecordState.START);
  };

  const stop = () => {
    setRecordState(RecordState.STOP);
  };

  //audioData contains blob and blobUrl
  const onStop = (audioData: any) => {
    setAudioSrc(() => audioData.url);
    console.log("audioData", audioData);
  };
  return (
    <div>
      <div>
        <AudioReactRecorder
          state={recordState}
          onStop={onStop}
          type="audio/ogg; codecs=opus"
        />

        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
      </div>
      <div className="w-[500px] h-[500px] bg-red-100 ">
        {audioSrc && <audio className="" src={audioSrc} controls />}
      </div>
      {/* <SwipeSelect startDate={startDate} setStartDate={setStartDate} /> */}
    </div>
  );
};

export default App;
