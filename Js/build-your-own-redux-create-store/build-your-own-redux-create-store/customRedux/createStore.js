const createStore = (reducer, preloadedState) => {
  if (typeof reducer !== "function") {
    throw Error("Reducer should be a function");
  }
  const listners = [];
  let state = preloadedState;
  let isDispatch = false;

  const getState = () => {
    if (isDispatch) {
      throw Error("cannot do store.getState while dispatchinng");
    }
    return state;
  };

  const dispatch = (action) => {
    console.log(action, typeof action);
    if (typeof action !== "object") {
      throw Error(" type of action should be an object");
    }

    if (typeof action.type === "undefined") {
      throw Error("Action should have a type");
    }

    if (isDispatch) {
      throw Error("cannot do store.disptch while dispatchinng");
    }
    isDispatch = true;
    try {
      state = reducer(state, action);
      listners.forEach((listner) => listner());
    } finally {
      isDispatch = false;
    }

    return action;
  };

  // used when action is dispatched and watch store changes
  const subscribe = (listener) => {
    if (typeof listener !== "function") {
      throw Error("type of listners should be function");
    }

    if (isDispatch) {
      throw Error("cannot do store.subscribe while dispatchinng");
    }

    listners.push(listener);

    return function unsubscribe() {
      if (isDispatch) {
        throw Error("cannot do store.unsubscribe while dispatchinng");
      }
      const index = listners.indexOf(listener);
      listners.splice(index, 1);
    };
  };

  dispatch({
    type:"INIT_ACTION"
  })

  return {
    getState,
    dispatch,
    subscribe,
  };
};

module.exports = createStore;
