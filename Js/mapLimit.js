// Inputs
// inputs: An array of inputs.
// limit: The maximum number of operations at any one time.
// iterateeFn: The async function that should be called with each input to generate the corresponding output. It will have two arguments:
//      input: The input being processed.
//      callback: A function that will be called when the input is finished processing. It will be provided one argument, the processed output.
// callback: A function that should be called with the array of outputs once all the inputs have been processed.

function getNameById(id, callback) {
    // simulating async request
    const randomRequestTime = Math.floor(Math.random() * 100) + 2000;
    console.log("randomRequestTime", randomRequestTime, id);
   
    setTimeout(() => {
      callback("User" + id)
    }, 5000);
  }


  
  function mapLimit(inputs, maxLimit, iterateeFn, callback) {
    let currentPtr = 0;
    let currentLimit = 0;
    const result = []

    const callBacFn = (id) => {
        result.push(id);
        currentLimit--;

        if(result.length == inputs.length  ) {
            callback(result)
        }
        if(currentPtr < inputs.length  && currentLimit < maxLimit) {
            iterateeFn(inputs[currentPtr++], callBacFn);
            currentLimit++
        }
    }   

    while(currentPtr < inputs.length  && currentLimit < maxLimit) {
        iterateeFn(inputs[currentPtr++], callBacFn)
        currentLimit++;
    }
  }
  
  mapLimit([1,2,3,4,5], 3, getNameById, (allResults) => {
    console.log('output:', allResults) // ["User1", "User2", "User3", "User4", "User5"]
  })