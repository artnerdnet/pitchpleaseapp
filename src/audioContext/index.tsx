import { TNote } from 'pitchplease/dist/types';
import React, { useEffect, useState } from 'react';
import { NoteIndicator } from '../components/noteIndicator';
import { pitchRecorder } from './pitch-recorder';

function AudioContextComponent() {
  const [audioInput, setAudioInput] = useState([]);
  const [init, setInit] = useState(false);


  const handleOutputNotes = (input: TNote[] | null) => {
    if (input) {
      const lastNonNullValues = input.filter(value => value != null).slice(-10)
      audioInput.length > 10 ? setAudioInput(lastNonNullValues) : setAudioInput([...audioInput, ...lastNonNullValues])
    }
  };

  useEffect(() => {
    if (init) {
      pitchRecorder(handleOutputNotes)
    }
  }, [init])

  return (
    <div>
      {audioInput.length && audioInput[audioInput.length - 1] && <NoteIndicator note={audioInput[audioInput.length - 1]} />}
      <button onClick={() => setInit(!init)}>start</button>
    </div>
  );
}

export default AudioContextComponent
