

const printName = function () {
    console.log(this.firstName + "-" + this.lastName);
}
const s = {
    firstName: "shubham",
    lastName : "soni",
}


// call polyfill
Function.prototype.myCall = function(scope, ...args) {
    scope._this = this;
    scope._this(...args)
}


//polyfill
Function.prototype.myBind = function(scope, ...args) {
    scope._this = this
    return function () {
        scope._this(...args)
    }
}
const fnBind = printName.myBind(s);
fnBind()

//apply
Function.prototype.myApply = function(scope, args) {
    scope._this = this;
    scope._this(...args)
}
