const { parentPort, workerData } = require('worker_threads');

ponger();
function ponger() {
  const { workerName } = workerData;
  console.log(`${workerName} has been spawned`);
  parentPort.once('message', ((message) => {
    if (message === 'ping') {
      console.log(`${workerName} recieved ping to begin async work from parent thread`);
      setTimeout( // Async event 
        () => { parentPort.postMessage(`Pong from ${workerName}`); }, // Callback to be executed
        Math.floor(Math.random() * 10000) // Mimics some async task. 
                                          // Execute call back after random seconds between 0 and 10
      );
    }
  }));
} 
