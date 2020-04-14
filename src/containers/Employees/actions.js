import {
  GET_ALL_EMPLOYEES_REQUEST,
  GET_ALL_EMPLOYEES_SUCCESS,
  GET_ALL_EMPLOYEES_FAILURE,
} from "./constants";

export function getAllEmployees() {
  console.log("calling action");
  return {
    type: GET_ALL_EMPLOYEES_REQUEST,
  };
}

export function getAllEmployeesSuccess(data) {
  return {
    type: GET_ALL_EMPLOYEES_SUCCESS,
    data,
  };
}

export function getAllEmployeesFailure(err) {
  return {
    type: GET_ALL_EMPLOYEES_FAILURE,
    err,
  };
}
