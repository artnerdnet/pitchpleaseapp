import { calculateAmplitudes, calculateAverageMagnitudeValues, computeMagnitudes, findMaximumMagnitude, interpretCorrelations } from 'pitchplease/dist/audioProcessing';
import { calcNotesFreq } from 'pitchplease/dist/frequencyComputations';
import React, { useEffect, useRef, useState } from 'react';
// import logo from './logo.svg';
// import './App.css';
import { AudioContext, AudioWorkletNode, OfflineAudioContext } from 'standardized-audio-context';
// import activeSound from './audioContext';
let audioCtx;

function AudioContextComponent() {
  const ref = useRef(null);
  const [audioContext, setAudioContext] = useState(null);
  const [microphone, setMicrophone] = useState(null);
  const [stream, setStream] = useState(null);

  // const handleSuccess = function (stream) {
  //   if (window.URL) {
  //     ref.current.srcObject = stream;
  //   } else {
  //     ref.current.src = stream;
  //   }
  // };

  const handleAudioInput = (stream) => {
    setStream(stream)
    setMicrophone(audioContext.createMediaStreamSource(stream));
    return audioContext?.audioWorklet
      .addModule('./audio-meter.worker.js')
      .catch((err) => console.log('error', err));

    // const audioNode = new AudioWorkletNode(audioContext, 'processor')
    // audioNode.connect(audioContext.destination)

    // console.log(audioContext, ' audio node')
    // microphone.connect(processor);
    // processor.connect(speaker);
  }

  // const handleAudioChange = (e) => {
  //   const file = e.target.files[0];
  //   const url = URL.createObjectURL(file);
  //   // Do something with the audio file.
  //   ref.current.src = url;
  // }

  const setupContext = function () {
    audioCtx = new AudioContext();
    setAudioContext(audioCtx)

  };

  useEffect(() => {
    setupContext()
  }, [])

  useEffect(() => {
    if (!ref || !audioContext) {
      return
    }
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(stream => {
        handleAudioInput(stream)
        let audio = ref.current
        audio.srcObject = stream
        audio.play()
      })
  }, [ref, audioContext])

  useEffect(() => {
    if (!audioContext) {
      return null
    } else {

      // audioCtx.audioWorklet.addModule('audio-meter.worker.js');
      // const oscillator = new OscillatorNode(audioCtx);
      // const bypasser = new AudioWorkletNode(audioCtx, 'bypass-processor');
      // oscillator.connect(bypasser).connect(audioCtx.destination);
      // oscillator.start();

      // const audiobuff = audioCtx.createBuffer()
      var frameCount = audioCtx.sampleRate * 2.0;

      var myArrayBuffer = audioCtx.createBuffer(2, frameCount, audioCtx.sampleRate);
      var nowBuffering = myArrayBuffer.getChannelData(0);
      // myArrayBuffer.connect()
      processAudio(nowBuffering)
    }
  }, [audioContext])

  const processAudio = (buffer) => {
    let bufferOutput = [];
    bufferOutput = bufferOutput.concat(Array.prototype.slice.call(buffer));

    if (bufferOutput.length > 100) {
      const notesFrequencies = calcNotesFreq();
      // const amplitudes = calculateAmplitudes(buffer, notesFrequencies, buffer.sampleRate);

      // const magnitudes = computeMagnitudes(amplitudes);

      // console.log(magnitudes, 'mag>>')
      // const maxMagnitude = findMaximumMagnitude(magnitudes);

      // const averageMagnitudeValues = calculateAverageMagnitudeValues(magnitudes, maxMagnitude.maxIndexReached);
      // console.log(magnitudes, 'magnitudes')
      // console.log(maxMagnitude, 'maxMagnitude')
      // console.log(averageMagnitudeValues, 'averageMagnitudeValues')

      // const dominantFrequency = interpretCorrelations(
      //   averageMagnitudeValues,
      //   maxMagnitude,
      //   notesFrequencies
      // );
      // console.log(dominantFrequency, 'dominantFrequency')
    }
  }


  return (
    <div>
      {/* <input onChange={handleAudioChange} type="file" accept="audio/*" capture /> */}
      <audio ref={ref} id="player" controls>audio</audio>
    </div>
  );
}

export default AudioContextComponent;
