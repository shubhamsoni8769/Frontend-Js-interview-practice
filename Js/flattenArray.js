//recursive
const flattenRecursive = (arr, depth) => {
  let result = [];
  for (let ele of arr) {
    if (Array.isArray(ele) && depth > 0) {
      result = result.concat(flattenRecursive(ele, depth - 1));
    } else {
      result.push(ele);
    }
  }
  return result;
};

let resultRecursive = flattenRecursive(
  [[[[[0]]], [1]], [[[2], [3]]], [[4], [5]]],
  2
); // [0, 1, 2, 3, 4, 5]
console.log(resultRecursive, "resulttttttttttttttttttttttttttt");

const flattenIterative = (arr) => {
  const stack = [...arr];
  const result = [];
  while (stack.length) {
    const ele = stack.pop();
    if (Array.isArray(ele)) {
      stack.push(...ele);
    } else {
      result.push(ele);
    }
  }
  return result.reverse();
};

let result = flattenIterative([[[[0]], [1]], [[[2], [3]]], [[4], [5]]], 2); // [0, 1, 2, 3, 4, 5]
// console.log(result, "resulttttttttttttttttttttttttttt");
