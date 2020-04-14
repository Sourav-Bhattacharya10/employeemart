import React, { Component } from "react";
import Loader from "react-loader-spinner";

class EmployeeList extends Component {
  componentDidMount() {
    this.props.getAllEmployees();
  }

  render() {
    return (
      <React.Fragment>
        <ul>
          {this.props.employees.length > 0 ? (
            this.props.employees.map((emp, idx) => (
              <li key={idx}>{emp.EmployeeName}</li>
            ))
          ) : (
            <Loader
              visible={this.props.isLoading}
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
            />
          )}
        </ul>
      </React.Fragment>
    );
  }
}

export default EmployeeList;
