
//service now
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

// console.log(result);  {name: 'abc', price:50}

// ------------------------------------------------------

var name1='shubham';
 
function callName() {
    name1= 'soni',
    console.log(name1)
}
callName()
// console.log(name1)

// ------------------------------------------------------

// Question 2
var name1 = 'shubham';
const obj = {
    name1:'soni',
    printName: function(){
        this.name1 = 'ram'
        return this.name1
    },
    printNameArrow: () => {
        return this.name1
    },
    IIFE: (function(){
        // console.log(this)
        return this.name1
    })(),
    IIFEArrow: (() => {
        // console.log(this)
        return this.name1
    })()
}  
console.log('---------------');
console.log(obj.printName()) 
console.log(obj.printNameArrow()) 
console.log(obj.IIFE) 
console.log(obj.IIFEArrow) 

// ------------------------------------------------------

// var name1 = 'Ram'
const obj1 = {
    name1:'soni',
    printName: {
        name1:'ji',
        place:'kashi',
        fn: function(){
            console.log(this)
            let fn1 = () =>{
                console.log(this.name1,)
            }
            fn1()
        }
       
       
    },
}
// console.log(obj1.printName.fn())


// ------------------------------------------------------


// const myObject = {
//   name: "Test",
//   getFunctionName: function () {
//     console.log(this);
//   },
//   getArrowFunctionName: () => {
//     console.log(this);
//   },
//   updateArrowFunctionScope: function () {
//     const innerArrowFunction = () => {
//       console.log(this);
//     };
//     innerArrowFunction();
//   },
// };

// myObject.getFunctionName();
// myObject.getArrowFunctionName();
// myObject.updateArrowFunctionScope();

// ------------------------------------------------------


function func() {
  try {
      console.log(1)
      return
  } catch (e) {
      console.log(2)
  } finally {
      console.log(3)
  }
  console.log(4)
}
func()
// Output: 1 3


// ------------------------------------------------------

console.log("start")
new Promise((res, rej) => {
    console.log("Promise1")
    resolve("resolved")
    console.log("Promise2")
}).then(data => console.log(data))
console.log("end")

// ------------------------------------------------------
