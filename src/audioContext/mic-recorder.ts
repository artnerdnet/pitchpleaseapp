// eslint-disable-next-line import/no-webpack-loader-syntax
import workletUrl from 'worklet-loader!./recorder.worklet.js';

export const main = async (setAudioInput: (data: any) => any) => {
  const context = new AudioContext();

  const microphone = await navigator.mediaDevices
    .getUserMedia({
      audio: true
    })

  const source = context.createMediaStreamSource(microphone);

  // NEW A: Loading the worklet processor

  await context.audioWorklet.addModule(workletUrl)
  // Create the recorder worklet
  const recorder = new AudioWorkletNode(
    context,
    "recorder.worklet"
  )

  source
    .connect(recorder)
    .connect(context.destination);

  recorder.port.onmessage = (e: {
    data: Float32Array
  }) => {
    console.log(e, 'e')
    setAudioInput(e.data)
    return e;
    // `data` is a Float32Array array containing our audio samples 
  }


}