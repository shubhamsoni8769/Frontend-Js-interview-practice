const debounceFn = (fn, delay) => {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

// if both flag are true meaning intial call and call after one sec both will happen

function customAdvancedDebounce(fn, delay, option = { leading: false, trailing: true }) {
  let isLeadingInvoked = false;
  let timerId = null;
  return function(...args) {
    const context = this;

    // clear timeout
    if(timerId) {
      clearTimeout(timerId)
    }

    //leading
    if(option.leading && !timerId) {
      fn.apply(this, args);
      isLeadingInvoked = true
    }else{
      isLeadingInvoked = false;
    }

    //traling
    timerId = setTimeout(() => {
      if(option.trailing && !isLeadingInvoked) {
        fn.apply(this, args)
      }
      timerId = null
    }, delay)
  }
}

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
