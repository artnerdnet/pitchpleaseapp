import React, { useEffect, useState } from 'react';
import { pitchRecorder } from './pitch-recorder';

function AudioContextComponent() {
  const [audioInput, setAudioInput] = useState(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (init) {
      pitchRecorder(setAudioInput)
    }
  }, [init])

  console.log(audioInput, 'audioInput')
  return (
    <div>
      <button onClick={() => setInit(!init)}>start</button>
    </div>
  );
}

export default AudioContextComponent
