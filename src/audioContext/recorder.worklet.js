// const { calculateAmplitudes } = require("pitchplease/dist/audioProcessing");
// const { calcNotesFreq } = require("pitchplease/dist/frequencyComputations");

/**
  An in-place replacement for ScriptProcessorNode using AudioWorklet
*/
console.log('test!!')

class RecorderProcessor extends AudioWorkletProcessor {

  constructor() {
    super();
    this.initBuffer()
  }

  // 0. Determine the buffer size (this is the same as the 1st argument of ScriptProcessor)
  bufferSize = 4096
  // 1. Track the current buffer fill level
  _bytesWritten = 0

  // 2. Create a buffer of fixed size
  _buffer = new Float32Array(this.bufferSize)



  initBuffer() {
    this._bytesWritten = 0
  }

  isBufferEmpty() {
    return this._bytesWritten === 0
  }

  isBufferFull() {
    return this._bytesWritten === this.bufferSize
  }

  // notesFreq = calcNotesFreq();

  /**
 * @param {Float32Array[][]} inputs
 * @returns {boolean}
 */
  process(inputs) {
    console.log('test!!')
    // console.log(inputs[0][0], 'inputs[0][0]')
    // console.log(sampleRate, 'sample')
    // calculateAmplitudes(inputs[0][0], notesFreq, )
    // Grabbing the 1st channel similar to ScriptProcessorNode
    this.append(inputs[0][0])
    // sampleRate
    return true
  }

  /**
   *
   * @param {Float32Array} channelData
   */
  append(channelData) {
    if (this.isBufferFull()) {
      this.flush()
    }

    if (!channelData) return
    // console.log(channelData, 'dt')
    for (let i = 0; i < channelData.length; i++) {
      this._buffer[this._bytesWritten++] = channelData[i]
    }
  }

  flush() {
    // trim the buffer if ended prematurely
    this.port.postMessage(
      this._bytesWritten < this.bufferSize
        ? this._buffer.slice(0, this._bytesWritten)
        : this._buffer
    )

    this.initBuffer()
  }

}

registerProcessor("recorder.worklet", RecorderProcessor)