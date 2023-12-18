import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

export const RecordState = Object.freeze({
  START: "start",
  PAUSE: "pause",
  STOP: "stop",
  NONE: "none",
});

interface AudioReactRecorderProps {
  state?: string;
  type: string;
  backgroundColor?: string;
  foregroundColor?: string;
  canvasWidth?: string | number;
  canvasHeight?: string | number;
  onStop?: (data: { blob: Blob; url: string; type: string }) => void;
}

const AudioReactRecorder: React.FC<AudioReactRecorderProps> = ({
  state = RecordState.NONE,
  type,
  backgroundColor = "rgb(200, 200, 200)",
  foregroundColor = "rgb(0, 0, 0)",
  canvasWidth = 500,
  canvasHeight = 300,
  onStop,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let leftchannel: Float32Array[] = [];
    let rightchannel: Float32Array[] = [];
    let recorder: ScriptProcessorNode | null = null;
    let recording = false;
    let recordingLength = 0;
    let volume: GainNode | null = null;
    let audioInput: MediaStreamAudioSourceNode | null = null;
    let sampleRate: number | null = null;
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    let context: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let stream: MediaStream | null = null;
    let tested = false;

    const getStream = async (constraints?: MediaStreamConstraints) => {
      if (!constraints) {
        constraints = { audio: true, video: false };
      }

      return navigator.mediaDevices.getUserMedia(constraints);
    };

    const setUpRecording = () => {
      context = new AudioContext();
      sampleRate = context.sampleRate;

      volume = context.createGain();

      audioInput = context.createMediaStreamSource(stream!);

      analyser = context.createAnalyser();

      audioInput.connect(analyser);

      recorder = context.createScriptProcessor(2048, 2, 2);

      analyser.connect(recorder);

      recorder.connect(context.destination);

      recorder.onaudioprocess = function (e) {
        if (!recording) return;

        let left = e.inputBuffer.getChannelData(0);
        let right = e.inputBuffer.getChannelData(1);

        if (!tested) {
          tested = true;
          if (!left.reduce((a, b) => a + b)) {
            console.log("Error: There seems to be an issue with your Mic");
            stop();
            stream!.getTracks().forEach(function (track) {
              track.stop();
            });
          }
        }

        leftchannel.push(new Float32Array(left));
        rightchannel.push(new Float32Array(right));
        recordingLength += 2048;
      };
    };

    const mergeBuffers = (
      channelBuffer: Float32Array[],
      recordingLength: number
    ) => {
      let result = new Float32Array(recordingLength);
      let offset = 0;
      let lng = channelBuffer.length;

      for (let i = 0; i < lng; i++) {
        let buffer = channelBuffer[i];
        result.set(buffer, offset);
        offset += buffer.length;
      }

      return result;
    };

    const interleave = (
      leftChannel: Float32Array,
      rightChannel: Float32Array
    ) => {
      let length = leftChannel.length + rightChannel.length;
      let result = new Float32Array(length);

      let inputIndex = 0;

      for (let index = 0; index < length; ) {
        result[index++] = leftChannel[inputIndex];
        result[index++] = rightChannel[inputIndex];
        inputIndex++;
      }

      return result;
    };

    const writeUTFBytes = (view: DataView, offset: number, string: string) => {
      let lng = string.length;

      for (let i = 0; i < lng; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    const setupMic = async () => {
      try {
        window.stream = stream = await getStream();
      } catch (err) {
        console.log("Error: Issue getting mic", err);
      }

      setUpRecording();
    };

    const start = async () => {
      await setupMic();

      recording = true;
      leftchannel.length = rightchannel.length = 0;
      recordingLength = 0;
    };

    const stop = () => {
      recording = false;
      closeMic();

      const leftBuffer = mergeBuffers(leftchannel, recordingLength);
      const rightBuffer = mergeBuffers(rightchannel, recordingLength);
      const interleaved = interleave(leftBuffer, rightBuffer);

      let buffer = new ArrayBuffer(44 + interleaved.length * 2);
      let view = new DataView(buffer);

      writeUTFBytes(view, 0, "RIFF");
      view.setUint32(4, 44 + interleaved.length * 2, true);
      writeUTFBytes(view, 8, "WAVE");
      writeUTFBytes(view, 12, "fmt ");
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true);
      view.setUint16(22, 2, true);
      view.setUint32(24, sampleRate!, true);
      view.setUint32(28, sampleRate! * 4, true);
      view.setUint16(32, 4, true);
      view.setUint16(34, 16, true);
      writeUTFBytes(view, 36, "data");
      view.setUint32(40, interleaved.length * 2, true);

      let lng = interleaved.length;
      let index = 44;
      let volume = 1;

      for (let i = 0; i < lng; i++) {
        view.setInt16(index, interleaved[i] * (0x7fff * volume), true);
        index += 2;
      }

      const blob = new Blob([view], { type });
      const audioUrl = URL.createObjectURL(blob);

      onStop?.({
        blob,
        url: audioUrl,
        type,
      });
    };

    const pause = () => {
      recording = false;
      closeMic();
    };

    const resume = () => {
      setupMic();
      recording = true;
    };

    const closeMic = () => {
      if (!stream) return;
      stream!.getAudioTracks().forEach((track) => {
        track.stop();
      });
      audioInput!.disconnect(0);
      analyser!.disconnect(0);
      recorder!.disconnect(0);
    };

    if (state === RecordState.START) {
      start();
    } else if (state === RecordState.PAUSE) {
      pause();
    } else if (state === RecordState.STOP) {
      stop();
    }

    return () => {
      closeMic();
    };
  }, [
    state,
    type,
    backgroundColor,
    foregroundColor,
    canvasWidth,
    canvasHeight,
    onStop,
  ]);

  return (
    <div className="audio-react-recorder">
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="audio-react-recorder__canvas"
      ></canvas>
    </div>
  );
};

AudioReactRecorder.propTypes = {
  state: PropTypes.string,
  type: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  foregroundColor: PropTypes.string,
  canvasWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  canvasHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onStop: PropTypes.func,
};

export default AudioReactRecorder;
