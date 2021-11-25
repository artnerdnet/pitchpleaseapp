// const { calculateAmplitudes } = require("pitchplease/dist/audioProcessing");
// const { calcNotesFreq } = require("pitchplease/dist/frequencyComputations");

/**
  An in-place replacement for ScriptProcessorNode using AudioWorklet
*/
import { frequencyComputations, audioProcessing } from 'pitchplease';
import { calculateAmplitudes } from 'pitchplease/dist/audioProcessing/calculateAmplitudes.js';

const notesFrequencies = frequencyComputations.calcNotesFreq();

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
  frequencies = []

  initBuffer() {
    this._bytesWritten = 0
  }

  isBufferEmpty() {
    return this._bytesWritten === 0
  }

  isBufferFull() {
    return this._bytesWritten === this.bufferSize
  }

  /**
 * @param {Float32Array[][]} inputs
 * @returns {boolean}
 */
  process(inputs) {
    // Grabbing the 1st channel similar to ScriptProcessorNode
    this.append(inputs[0][0])

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

    for (let i = 0; i < channelData.length; i++) {
      this._buffer[this._bytesWritten++] = channelData[i]
    }
  }

  flush() {
    const amplitudes = calculateAmplitudes(
      this._buffer,
      notesFrequencies,
      41000
    );

    const magnitudes = audioProcessing.computeMagnitudes(amplitudes);
    const maxMagnitude = audioProcessing.findMaximumMagnitude(magnitudes);
    const averageMagnitudeCalculation = audioProcessing.calculateAverageMagnitudeValues(magnitudes, maxMagnitude.strongestMagnitude);
    const dominantFrequency = audioProcessing.interpretCorrelations(
      averageMagnitudeCalculation,
      maxMagnitude,
      notesFrequencies
    );

    this.frequencies = [...this.frequencies, dominantFrequency]

    // trim the buffer if ended prematurely
    this.port.postMessage(
      this._bytesWritten < this.bufferSize
        ? this._buffer.slice(0, this._bytesWritten)
        : this.frequencies
    )

    this.initBuffer()
  }
}

registerProcessor("recorder.worklet", RecorderProcessor);