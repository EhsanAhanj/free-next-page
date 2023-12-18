import useAudioRecorder, {
  MediaAudioTrackConstraints,
  IRecorderControls,
} from "@/hooks";
import React, { useState, useEffect, ReactElement, Suspense } from "react";

interface StyleProps {
  /**
   * Applies passed classes to audio recorder container
   **/
  AudioRecorderClass?: string;
  /**
   * Applies passed classes to audio recorder start/save option
   **/
  AudioRecorderStartSaveClass?: string;
  /**
   * Applies passed classes to audio recorder timer
   **/
  AudioRecorderTimerClass?: string;
  /**
   * Applies passed classes to audio recorder status option
   **/
  AudioRecorderStatusClass?: string;
  /**
   * Applies passed classes to audio recorder pause/resume option
   **/
  AudioRecorderPauseResumeClass?: string;
  /**
   * Applies passed classes to audio recorder discard option
   **/
  AudioRecorderDiscardClass?: string;
}

export interface Props {
  /**
   * This gets called when the save button is clicked.
   * In case the recording is cancelled, the blob is discarded.
   **/
  onRecordingComplete?: (blob: Blob) => void;
  /**
   * This gets called when the getUserMedia Promise is rejected.
   * It takes the resultant DOMException as its parameter.
   **/
  onNotAllowedOrFound?: (exception: DOMException) => any;
  /**
   * Allows calling of hook outside this component. The controls returned by the hook can then be passed to the component using this prop.
   * This allows for use of hook methods and state outside this component
   * @sample_usage https://github.com/samhirtarif/react-audio-recorder#combine-the-useaudiorecorder-hook-and-the-audiorecorder-component
   **/

  recorderControls?: IRecorderControls;
  /**
   * Takes a {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSettings#instance_properties_of_audio_tracks subset} of
   * `MediaTrackConstraints` that apply to the audio track
   *
   * @Property `deviceId`
   * @Property `groupId`
   * @Property `autoGainControl`
   * @Property `channelCount`
   * @Property `echoCancellation`
   * @Property `noiseSuppression`
   * @Property `sampleRate`
   * @Property `sampleSize`
   */
  audioTrackConstraints?: MediaAudioTrackConstraints;
  /**
   * If set to `true` the file gets downloaded when save recording is pressed
   **/
  downloadOnSavePress?: boolean;
  /**
   * File extension for the audio filed that gets downloaded
   **/
  downloadFileExtension?: "mp3" | "wav" | "webm";
  /**
   * Displays a waveform visualization for the audio when set to `true`. Defaults to `false`
   **/
  showVisualizer?: boolean;
  /**
   * The options passed to the HTML MediaRecorder API.
   **/
  mediaRecorderOptions?: MediaRecorderOptions;
  /**
   * Custom classes to changes styles.
   **/
  classes?: StyleProps;
}

const AudioRecorder: (props: Props) => ReactElement = ({
  onRecordingComplete,
  onNotAllowedOrFound,
  recorderControls,
  audioTrackConstraints,
  downloadOnSavePress = false,
  downloadFileExtension = "webm",
  showVisualizer = false,
  mediaRecorderOptions,
  classes,
}: Props) => {
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
  } = useAudioRecorder(
    audioTrackConstraints,
    onNotAllowedOrFound,
    mediaRecorderOptions
  );

  const [shouldSave, setShouldSave] = useState(false);

  const stopAudioRecorder: (save?: boolean) => void = (
    save: boolean = true
  ) => {
    setShouldSave(save);
    stopRecording();
  };

  useEffect(() => {
    if (
      (shouldSave || recorderControls) &&
      recordingBlob != null &&
      onRecordingComplete != null
    ) {
      onRecordingComplete(recordingBlob);
    }
  }, [recordingBlob]);

  return (
    <div
      className={`audio-recorder ${isRecording ? "recording" : ""} ${
        classes?.AudioRecorderClass ?? ""
      }`}
      data-testid="audio_recorder"
    >
      <img
        // src={isRecording ? saveSVG : micSVG}
        className={`audio-recorder-mic ${
          classes?.AudioRecorderStartSaveClass ?? ""
        }`}
        onClick={isRecording ? () => stopAudioRecorder() : startRecording}
        data-testid="ar_mic"
        title={isRecording ? "Save recording" : "Start recording"}
      />
      <span
        className={`audio-recorder-timer ${
          !isRecording ? "display-none" : ""
        } ${classes?.AudioRecorderTimerClass ?? ""}`}
        data-testid="ar_timer"
      >
        {Math.floor(recordingTime / 60)}:
        {String(recordingTime % 60).padStart(2, "0")}
      </span>
      {showVisualizer ? (
        <span
          className={`audio-recorder-visualizer ${
            !isRecording ? "display-none" : ""
          }`}
        >
          {mediaRecorder && (
            <Suspense fallback={<></>}>
              {/* <LiveAudioVisualizer
                mediaRecorder={mediaRecorder}
                barWidth={2}
                gap={2}
                width={140}
                height={30}
                fftSize={512}
                maxDecibels={-10}
                minDecibels={-80}
                smoothingTimeConstant={0.4}
              /> */}
            </Suspense>
          )}
        </span>
      ) : (
        <span
          className={`audio-recorder-status ${
            !isRecording ? "display-none" : ""
          } ${classes?.AudioRecorderStatusClass ?? ""}`}
        >
          <span className="audio-recorder-status-dot"></span>
          Recording
        </span>
      )}
      <img
        // src={isPaused ? resumeSVG : pauseSVG}
        className={`audio-recorder-options ${
          !isRecording ? "display-none" : ""
        } ${classes?.AudioRecorderPauseResumeClass ?? ""}`}
        onClick={togglePauseResume}
        title={isPaused ? "Resume recording" : "Pause recording"}
        data-testid="ar_pause"
      />
      <img
        // src={discardSVG}
        className={`audio-recorder-options ${
          !isRecording ? "display-none" : ""
        } ${classes?.AudioRecorderDiscardClass ?? ""}`}
        onClick={() => stopAudioRecorder(false)}
        title="Discard Recording"
        data-testid="ar_cancel"
      />
    </div>
  );
};

export default AudioRecorder;
