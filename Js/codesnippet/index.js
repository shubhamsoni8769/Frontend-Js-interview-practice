function Apple() {
  this.price = 50;
}

var obj = { name: "abc" };

function bind(scope) {
  return function () {
    fn.call(scope);
  };
}

var fruit = Apple.bind(obj);

var result = fruit();

console.log(result); // {name: 'abc', price:50}
