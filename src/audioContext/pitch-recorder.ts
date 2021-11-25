// eslint-disable-next-line import/no-webpack-loader-syntax
import workletUrl from 'worklet-loader!./recorder.worklet.js';

export const pitchRecorder = async (handleOutput: (data: any) => any) => {
  const context = new AudioContext();

  const microphone = await navigator.mediaDevices
    .getUserMedia({
      audio: true
    })

  const source = context.createMediaStreamSource(microphone);

  await context.audioWorklet.addModule(workletUrl)

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
    handleOutput(e.data)
    return e;
  }
}