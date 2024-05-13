class cal {
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
    val() {
        return this.val
    }
}


function calFn() {
    let total = 0;
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
}

console.log(cal(2).add(2).sub(8).val());