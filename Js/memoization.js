// still need to figure out memoization of object ???
// {a:1, b:2}
// {b:2, a:1}
const memoization = (fn) => {
  const cacheMap = {};
  return function (...args) {
    const key = JSON.stringify(args);
    console.log(key);
    if (cacheMap.hasOwnProperty(key)) {
      return cacheMap[key];
    } else {
      cacheMap[key] = fn.call(this, ...args);
    }
    console.log(cacheMap);
  };
};

const square = (num1, num2) => {
  for (let i = 0; i < 10000; i++) {}

  return num1 * num2;
};
const betterFun = memoization(square);
const betterFun2 = memoization(square);
// betterFun(1, 2);
// betterFun2(1, 2);

// cache Promises

const memoizationPromises = () => {
    const userPromisesCache = new Map();
    return function (...url) {
        if (!userPromisesCache.has(url[0])) {
            const userPromise = fetch(url[0]);
            userPromisesCache.set(url[0], userPromise);
          }
        
          return userPromisesCache.get(url[0]);
    }
}

const getUserById = memoizationPromises()

getUserById(`https://jsonplaceholder.typicode.com/todos/1`)
  .then((data) => data.clone().json())
  .then((data) => console.log(data));
setTimeout(() => {
  getUserById(`https://jsonplaceholder.typicode.com/todos/1`)
    .then((data) => data.clone().json())
    .then((data) => console.log(data));
}, 1000);
getUserById(`https://jsonplaceholder.typicode.com/todos/1`)
  .then((data) => data.clone().json())
  .then((data) => console.log(data));