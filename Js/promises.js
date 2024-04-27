// Promie.all
function myPromiseAll(taskList) {
  const result = [];
  return new Promise((resolve, reject) => {
    for (let i = 0; i < taskList.length; i++) {
      Promise.resolve(taskList[i])
        .then((data) => {
          console.log("here");
          result.push(data);
          if (result.length === taskList.length) {
            resolve(result);
          }
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

function task(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject("time");
    }, time);
  });
}

// const taskList = [task(1000), task(5000), task(3000)];

//run promise.all

//   myPromiseAll(taskList)
//     .then(results => {
//       console.log("got results", results)
//     })
//     .catch(console.error);

// Output:
// "got results" [1000,5000,3000]

//Promise.Any

function myPromiseAny(tasks) {
  const errors = [];
  return new Promise((resolve, reject) => {
    tasks.forEach((task) => {
      Promise.resolve(task)
        .then(resolve)
        .catch((error) => {
          errors.push(error);
          if (errors.length === tasks.length) {
            reject(errors);
          }
        });
    });
  });
}

// Input:
const test1 = new Promise(function (resolve, reject) {
  setTimeout(reject, 500, "one");
});

const test2 = new Promise(function (resolve, reject) {
  setTimeout(reject, 600, "two");
});

const test3 = new Promise(function (resolve, reject) {
  setTimeout(reject, 200, "three");
});

// myPromiseAny([test1, test2, test3])
//   .then(function (value) {
//     console.log(value);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// Output: "two";

//Promise.allSettle
// 1st approch
function myPromiseAllsettle(tasks) {
  const result = [];
  return new Promise((resolve, reject) => {
    tasks.forEach((task) => {
      Promise.resolve(task)
        .then((value) => {
          result.push({ status: "fulfilled", value });
        })
        .catch((value) => {
          result.push({ status: "reject", value });
        })
        .finally(() => {
          if (tasks.length === result.length) {
            resolve(result);
          }
        });
    });
  });
}

// Input:
// const aa = new Promise((resolve) => setTimeout(() => { resolve(3) },2000));
// const bb = new Promise((_ , reject) => reject(9));
// const cc = new Promise((resolve) => resolve(5));

// myPromiseAllsettle([aa, bb, cc]).then((val)=> {console.log(val)});

// Output:
// [
//   {
//     "status": "fulfilled",
//     "value": 3
//   },
//   {
//     "status": "rejected",
//     "reason": 9
//   },
//   {
//     "status": "fulfilled",
//     "value": 5
//   }
// ]

// Promise.Race

function myPromiseRace(tasks) {
  return new Promise((resolve, reject) => {
    tasks.forEach((task) => {
      task.then(resolve, reject).catch(reject);
    });
  });
}

// Input:
const test11 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 500, "one");
});

const test22 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, "two");
});

const test33 = new Promise(function (resolve, reject) {
  setTimeout(reject, 200, "three");
});

// myPromiseRace([test11, test22, test33]).then(function (value) {
//   console.log(value);
// }).catch(function (err){
//   console.log(err);
// });

// Output:
// "two"

// Custom Promise

const STATE = {
  FULLFILL: "fullfill",
  REJECTED: "rejected",
  PENDING: "pending",
};

class MyPromise {
  state = STATE.PENDING;
  thenCb = [];
  catchCb = [];
  value;
  resolve = this.#resolve.bind(this); //can written as onSuccess
  reject = this.#reject.bind(this); //onFailure
  constructor(cb) {
    try {
      cb(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }
  #runCallBack() {
    if (STATE.FULLFILL === this.state) {
      this.thenCb.forEach((callBack) => {
        callBack(this.value);
      });
      this.thenCb = [];
    }

    if (STATE.REJECTED === this.state) {
      this.catchCb.forEach((callBack) => {
        callBack(this.value);
      });
      this.catchCb = [];
    }
  }

  #resolve(value) {
    if (this.state === STATE.PENDING) return; // this will make sure first resolve or rejected method will be called

    if(value instanceof MyPromise) {
        value.then(this.resolve, this.reject);
        return
    }
    this.value = value;
    this.state = STATE.FULLFILL;

    this.#runCallBack();
  }

  #reject(value) {
    if (this.state === STATE.PENDING) return;

    if(value instanceof MyPromise) {
        value.then(this.resolve, this.reject);
        return
    }
    this.value = value;
    this.state = STATE.REJECTED;
    this.#runCallBack();
  }

  then(thenCb, catchCb) {
    return new MyPromise((resolve, reject) => {
        this.thenCb.push(result => {
            if(thenCb == null) { //aviod catch and pass to next .then
                resolve(result)
                return
            }

            try{
                resolve(thenCb(result))
            }catch(e) {
                reject(e)
            }
        })

        this.catchCb.push(result => {
            if(catchCb == null) {
                reject(result) 
                return
            }

            try{
                resolve(catchCb(result))
            }catch(e) {
                reject(e)
            }
        })
  

      this.#runCallBack(); //If we are adding new then cb and previous is resolved
    });
  }

  catch(cb) {
    return this.then(undefined, cb);
  }

  finally(cb) {
    return this.then(result => {
        cb();
        return result
    }, result => {
        cb()
        throw result
    })
  }

    static PromiseResolve(cb) {
        return new MyPromise(res => {
            res(value)
        })

    }
    static PromiseReject(cb) {
        return new MyPromise((res,rej) => {
            rej(value)
        })

    }
}

const promise = new Promise((resolve, rejected) => {})
  .then(
    (res) => {},
    (rej) => {}
  )
  .catch((rej) => {});
