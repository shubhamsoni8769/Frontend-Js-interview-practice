class EventEmitter {
    constructor() {
        this._subscription = new Map();

    }

    subscriber(eventName, cb) {
        if(!this._subscription.has(eventName)) {
            this._subscription.set(eventName, new Map());
        }
        
        if(!cb || typeof cb !== "function") {
            throw new TypeError("callback should be a function")
        }
        // Symbol is guranteed unique Id
        // we can also use new Date() or uuid
        const subscriptionId = Symbol();
        const eventSubscriptions = this._subscription.get(eventName);

        eventSubscriptions.set(subscriptionId, cb);


        return {
            release: function() {
                if(!eventSubscriptions.has(subscriptionId)) {
                    //throw an error
                    throw new Error("sub is already released")
                
                }
                eventSubscriptions.delete(subscriptionId)
            }

        }

    }

    emit(eventName, ...args) {
        const eventSubscriptions = this._subscription.get(eventName);
        if(!eventSubscriptions) {
            //throw error
            return;
        }
        
        eventSubscriptions.forEach(value => value(...args));

    }
}

const emitter = new EventEmitter();
let channel = ""
const subscription = emitter.subscriber("modify", (link) => {

})

emitter.emit("modify", "soni@gmail.com");

subscription.release()