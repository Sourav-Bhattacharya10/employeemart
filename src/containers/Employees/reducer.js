import { fromJS } from "immutable";
import {
  GET_ALL_EMPLOYEES_REQUEST,
  GET_ALL_EMPLOYEES_SUCCESS,
  GET_ALL_EMPLOYEES_FAILURE,
} from "./constants";

const initialState = fromJS({
  employees: [],
  isLoading: false,
  error: null,
});

// const initialState = {
//   employees: [{ EmployeeName: "Test" }],
//   isLoading: false,
//   error: null,
// };

function employeeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_EMPLOYEES_REQUEST:
      return state.set("isLoading", true);
    case GET_ALL_EMPLOYEES_SUCCESS:
      return state.set("isLoading", false).set("employees", action.data);
    case GET_ALL_EMPLOYEES_FAILURE:
      return state.set("isLoading", false).set("error", action.err);
    default:
      return state;
  }
}

export default employeeReducer;
