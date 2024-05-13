class Cal {
    constructor(val) {
        this.val = val
    }

    add(val) {
        this.val += val;
        return this
    }
    sub(val) {
        this.val -= val;
        return this

    }
    value() {
        return this.val
    }
}

let obj = new Cal(2)
console.log(obj);
console.log(obj.add(3).sub(4).value());


function calFn(k) {
    let total = k
    const obj = {
        add, sub, val
    }
    function add (val) {
        total += val;
        return obj
    }

    function sub(val) {
        total -= val;
        return obj 
    }

    function val() {
        return total
    }
    return obj
}

let obj1 = calFn(2);
console.log(obj1.add(2).sub(8).val());
// console.log(global.calObj)


