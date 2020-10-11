const {
  Worker,
  parentPort,
  isMainThread,
} = require('worker_threads');


// An example function that spawns multiple threads. 
// Then ping them to start some async work after which listens to 
// those workers for success messages.
function spawnThreads() {
  const workers = ['worker1', 'worker2'];
  if (!isMainThread) return;
  console.log('Starting spawning threads');
  workers.forEach((workerName) => {

    const worker = new Worker('./workers/ponger.js', { workerData: { workerName } });

    console.log(`Parent thread pinging ${workerName} to begin async tasks`);
    worker.postMessage('ping');

    worker.once('message', (message) => console.log(message));

    worker.on('error', (error) => console.log(error));
  });
}

spawnThreads();