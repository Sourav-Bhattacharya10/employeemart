import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
// import request from "../../utils/request";
import {
  GET_ALL_EMPLOYEES_REQUEST,
  GET_ALL_EMPLOYEES_SUCCESS,
  GET_ALL_EMPLOYEES_FAILURE,
} from "./constants";

function* getAllEmployeesDataAsync() {
  try {
    console.log("calling saga");
    const { data } = yield call(axios.get, "http://localhost:8850/employees");
    console.log("Axios response : ", data);
    yield put({ type: GET_ALL_EMPLOYEES_SUCCESS, data });
  } catch (error) {
    yield put({ type: GET_ALL_EMPLOYEES_FAILURE, error });
  }
}

export default function* defaultSaga() {
  yield takeLatest(GET_ALL_EMPLOYEES_REQUEST, getAllEmployeesDataAsync);
}
