class ResourcePoolMember {
    constructor(data) {
        this.data = data;
        // this.available = true;
        //for duration
        this.time = 0
    }
}

const DURATION = 3000;

class ResourcePool {
    poolArray = null;
    creatorFn = () => {};
    resetFn = () => {};
    constructor(creatorFn, resetFn, size=1000) {
        this.creatorfn = creatorFn;
        this.resetFn = resetFn;
        this.poolArray = new Array(size).fill(0).map(() => this.createElement())
    }
    createElement() {
        const data = this.resetFn(this.creatorfn());
        return new ResourcePoolMember(data)
    }

    getElement() {
        for(let i=0; i< this.poolArray.length; i++) {
            if(Date.now() - this.poolArray[i].time > DURATION) {
                this.releaseElement(this.poolArray[i])
                this.poolArray[i].time = Date.now()
                return this.poolArray[i]
            }
        }
        return null
    }
    releaseElement(element) {
        element.time = 0
        this.resetFn(element.data)
    }
}

const creatorFn = () => {
    return {
        counter: 0
    }
}

const resetFn = (obj) => {
    obj.counter = 0;
    delete obj.name;
    return obj
}

// singleton design pattern on resource pool
const myPool = new ResourcePool(creatorFn, resetFn, 1);

const objToUse = myPool.getElement();

// console.log(objToUse)
//
// objToUse.data.counter++;
// objToUse.data.name = "shubham";
// console.log(objToUse);
//
// myPool.releaseElement(objToUse)
//
// const objToUse2 = myPool.getElement()
// console.log(objToUse2)

setTimeout(() => {
    // console.log()
    const objToUse2 = myPool.getElement();
    console.log(objToUse2)
},4000)