import { AudioContext, AudioWorkletNode } from 'standardized-audio-context';
import React, { useEffect, useRef, useState } from 'react';
import getAudioInput from './getAudioInput';
import { main } from './mic-recorder';
import { calcNotesFreq } from 'pitchplease/dist/frequencyComputations';
import { calculateAmplitudes } from 'pitchplease/dist/audioProcessing/calculateAmplitudes';
import { calculateAverageMagnitudeValues, interpretCorrelations } from 'pitchplease/dist/audioProcessing';
import { computeMagnitudes } from 'pitchplease/dist/audioProcessing/calculateMagnitudes';
import { findMaximumMagnitude } from 'pitchplease/dist/audioProcessing/calculateMagnitudes';

function AudioContextComponent() {
  const [audioInput, setAudioInput] = useState(null);
  const [init, setInit] = useState(false);

  // const setInput = () => {
  //   main().then((data) => setAudioInput(data));

  //   console.log(context, 'ccc')
  // }

  useEffect(() => {
    if (init) {
      main(setAudioInput)
    }
  }, [init])

  useEffect(() => {
    if (audioInput) {
      const notes = calcNotesFreq();
      const sampleRate = 44100;
      const amplitudes = calculateAmplitudes(audioInput, notes, sampleRate);
      // (alias) interpretCorrelations(averageMagnitudeCalculation: number, maxMagnitude: TMaxMagnitude, notesFrequencies: TNotesFrequencies): number | void
      const magnitudes = computeMagnitudes(amplitudes);
      const maxMagnitude = findMaximumMagnitude(magnitudes);
      console.log(maxMagnitude, 'max')
      // calculateAverageMagnitudeValues(magnitudes, maxMagnitude);

      // const dominantFrequency = interpretCorrelations(
      //   amplitudes,
      //   notesFrequencies
      // );

      // currentPitchHandler(dominantFrequency);
    }
  }, [audioInput])

  return (
    <div>
      <button onClick={() => setInit(true)}>start</button>
      {/* <input onChange={handleAudioChange} type="file" accept="audio/*" capture /> */}
      <audio id="player" controls>audio</audio>
    </div>
  );
}

export default AudioContextComponent
