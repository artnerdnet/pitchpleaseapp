class PTModuleProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
  }

  process(inputs, outputs, params) {
    console.log('process')
    // this method gets automatically called with a buffer of 128 frames
    // audio process goes here
    // if you don't return true, webaudio will stop calling your process method
    return true;
  }
}

// you also need to register your class so that it can be intanciated from the main thread
registerProcessor('mod-processor', PTModuleProcessor);
