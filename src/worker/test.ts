const worker: Worker = self as any  
  
worker.addEventListener('message', (event) => {  
  console.log('Worker Received:', event.data)
  // let count: number = 1
  // while (count < 1000000000){
  //     count++
  // }
  worker.postMessage({ result: event.data })  
})
