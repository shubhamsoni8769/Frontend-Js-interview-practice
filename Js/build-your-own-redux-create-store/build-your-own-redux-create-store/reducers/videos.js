const VIDEOS_ACTIONS = {
  ADD_VIDEO: "ADD_VIDEO",
};

function videos(
  state = {
    data: [],
  },
  action
) {
  switch (action.type) {
    case VIDEOS_ACTIONS.ADD_VIDEO:
      // subscribe --> X
      // getStore --> X
      // dispatch --> X
      // unsubscribe --> X
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    default:
      return state;
  }
}

module.exports = videos;
