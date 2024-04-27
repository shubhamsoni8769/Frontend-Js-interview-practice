function currying(fn) {
    return function (...args) {
        if(args.length >= fn.length) {
            return fn.apply(this, args)
        }else{
            return function(...args2) {
                return curriedFn.apply(this, args.concat(args2))
            }
        }
    }
}


function multiply (a,b,c,d) {
    return a*b*c*d
}
const curriedFn = currying(multiply)

console.log(curriedFn(1)(2)(3)(4));
console.log(curriedFn(1,2)(3,4));

console.log(curriedFn(1)(2,3)(4));



// 2nd Question

function curry(args) {
    return function (args2) {
        if(!args2) {
            return args 
        }else{
            return curry(args + args2)
        }
    }
}

const ans = curry(1)(2)(3)(4)()
console.log(ans);
