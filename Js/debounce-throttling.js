const debounceFn = (fn, delay) => {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

//Throttling

// Count based
const throttleCountBased = (fn, count) => {
    let counter = 0
     return function (...args) {
        console.log(count,  counter);
        if(counter % count === 0) {
            fn.apply(this, args)
        }
        counter++
     }
}


// Time based
const throttleFnTimeBased = (fn, delay) => {
  let lastExecuted;
  let timerId;
  return function (...args) {
    if (!lastExecuted) {
      fn.apply(this, args);
      lastExecuted = Date.now();
    } else {
      clearTimeout(timerId);

      timerId = setTimeout(() => {
        if (Date.now() - lastExecuted >= delay) {
          fn.apply(this, args);
          lastExecuted = Date.now();
        }
      }, delay - (Date.now() - lastExecuted));
    }
  };
};




const onClick = () => {
  console.log("Clicked");
};
const throttling = throttleFnTimeBased(onClick, 2000);

const btn = document
  .getElementById("btn")
  .addEventListener("click", throttling);
