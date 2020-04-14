import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import injectReducer from "../../utils/injectReducer";
import injectSaga from "../../utils/injectSaga";
import EmployeeList from "../../components/EmployeeList";
import EmployeeAddOrEdit from "../../components/EmployeeAddOrEdit";
import { getAllEmployees } from "./actions";
import reducer from "./reducer";
import saga from "./saga";
import makeSelectEmployeesContainer, {
  makeSelectError,
  makeSelectIsLoading,
} from "./selectors"; // makeSelectError, // makeSelectIsLoading,

class Employees extends Component {
  render() {
    console.log("Employees props : ", this.props);
    console.log(
      "isLoading : ",
      this.props.isLoading,
      " error : ",
      this.props.error
    );
    return (
      <React.Fragment>
        <h1>Employees</h1>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to={`${this.props.match.url}/list`}>List</Link>
              </li>
              <li>
                <Link to={`${this.props.match.url}/addoredit`}>
                  Add Or Edit
                </Link>
              </li>
            </ul>
          </nav>
          <hr />
          <Switch>
            <Route path={`${this.props.match.path}/list`}>
              <EmployeeList
                employees={this.props.employeesContainer.employees}
                getAllEmployees={this.props.getAllEmployees}
                isLoading={this.props.isLoading}
              />
            </Route>
            <Route path={`${this.props.match.path}/addoredit`}>
              <EmployeeAddOrEdit />
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  employeesContainer: makeSelectEmployeesContainer(),
  isLoading: makeSelectIsLoading(),
  error: makeSelectError(),
});

// function mapStateToProps(state) {
//   return { employees: state.employees };
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllEmployees }, dispatch);
  // return bindActionCreators([getAllEmployees], dispatch);
}

const withConnect = connect(mapStateToProps, mapDispatchToProps); //, mapDispatchToProps
const withReducer = injectReducer({ key: "employees", reducer });
const withSaga = injectSaga({ key: "employees", saga });

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect
)(Employees);

// export default withRouter(connect(mapStateToProps)(Employees));

// export default Employees;
