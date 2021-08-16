import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = (dataType, dataName, data) => {
  return {
    type: ADD,
    dataName,
    data,
    dataType,
  };
};

const reducer = (state = {}, action) => {
  console.log(action);

  switch (action.type) {
    case ADD:
      return {
        ...state,
        [action.dataType]: {
          ...state[action.dataType],
          [action.dataName]: action.data,
        },
      };
    case DELETE:
      return state.filter((toDo) => toDo !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));
export default store;

export const actionCreators = {
  addToDo,
};
