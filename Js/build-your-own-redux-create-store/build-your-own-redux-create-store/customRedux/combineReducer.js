function combineReducers (reducers) {
    const reducerKey = Object.keys(reducers); // ['users', 'videos']
    const finalReducer = {};

    for(let key of reducerKey) {
        if(typeof reducers[key] === "undefined") {
            console.log(`No reducer provided for this key ${key}`);
        }

        if( typeof reducers[key] === "function") {
            finalReducer[key] = reducers[key]
        }
    }

    const finalReducerKeys = Object.keys(finalReducer);


    let shapeAssertionError;
    // case

    // const rootReducer = combineReducers({
    //     videos,
    //     users :() => undefined,
    //   });

    try {
        finalReducerKeys.forEach(key => {
            const reducer = reducers[key];
            const initialState = reducer(undefined, {
                type: "INIT_ACTION"
            });

            if(typeof initialState === "undefined") {
                throw new Error("initial state error")
            }
        })
    }catch(e) {
        shapeAssertionError = e
    }

    return function combined (state, action) {
        if(shapeAssertionError) {
            throw shapeAssertionError
        }


        if(!finalReducerKeys.length) {
            console.log("store doent has valid reducer");
        }

        const updatedState = {};

        for(let key of finalReducerKeys) {
            const prevStateForKey = state[key];
            const reducer =  reducers[key];
            const newState = reducer(prevStateForKey, action);
            if(typeof newState === "undefined") {
                throw Error(" new state cannot be undefined for reducer")
            }

            updatedState[key] = newState

        }
        return updatedState
    }


}

module.exports = combineReducers;
