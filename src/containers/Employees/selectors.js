import { createSelector } from "reselect";

/**
 * Direct selector to the employee state domain
 */
const selectEmployeeDomain = (state) => state.get("employees");

/**
 * Other specific selectors
 */
const makeSelectIsLoading = () =>
  createSelector(selectEmployeeDomain, (subState) => subState.get("isLoading"));

const makeSelectError = () =>
  createSelector(selectEmployeeDomain, (subState) => subState.get("error"));

/**
 * Default selector used by Employee
 */

const makeSelectEmployeesContainer = () =>
  createSelector(selectEmployeeDomain, (substate) => substate.toJS());

export default makeSelectEmployeesContainer;
export { selectEmployeeDomain, makeSelectIsLoading, makeSelectError };
