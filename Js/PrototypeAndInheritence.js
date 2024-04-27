// class Person {
//     constructor(name) {
//         this.name = name
//     }
//     hello() {
//         return "Hello" + this.name
//     }
// }

// class Developer extends Person {
//     constructor(name, title) {
//         super(name);
//         this.title = title
//     }
//     getTitle() {
//         return this.title
//     }
// }

function Person(name) {
  this.name = name;
}

Person.prototype.hello = function () {
  return "Hello" + this.name;
};

function Developer(name, title) {
  Person.call(this, name);
  this.title = title;
}
Developer.prototype = Object.create(Person.prototype);
Developer.prototype.constructor = Developer;
Developer.prototype.getTitle = function () {
  return this.title;
};

const obj = new Developer("soni", "engineer");
console.log(obj.hello());
