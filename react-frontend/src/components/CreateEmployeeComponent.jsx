import React, { Component, useState } from 'react'
import EmployeeService from '../services/EmployeeService';
import DepartmentService from '../services/DepartmentService';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
            departments: [],
            id: this.props.match.params.id,
            ecode: '',
            name: '',
            dob: '',
            gender: '',
            mobile: '',
            selectedDepartment: ''

        }
        this.changeEcodeHandler = this.changeEcodeHandler.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
        this.changeDobHandler = this.changeDobHandler.bind(this);
        this.changeGenderHandler = this.changeGenderHandler.bind(this);
        this.changeMobileHandler = this.changeMobileHandler.bind(this);
        this.changeDeptIdHandler = this.changeDeptIdHandler.bind(this);
    }

    componentDidMount() {
        DepartmentService.getDepartments().then((res) => {
            this.setState({ departments: res.data });
        });

        if (this.state.id === '_add') {
            return
        } else {
            EmployeeService.getEmployeeById(this.state.id).then((res) => {
                let employee = res.data.employee;
                this.setState({
                    ecode: employee.ecode,
                    name: employee.name,
                    dob: new Date(employee.dob),
                    gender: employee.gender,
                    mobile: employee.mobile,
                    selectedDepartment: employee.deptId,
                });
                console.log('edit employee => ' + JSON.stringify(employee));
            });
        }
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        if (this.state.id === '_add') {
            let employee = { ecode: this.state.ecode, name: this.state.name, dob: this.state.dob, gender: this.state.gender, mobile: this.state.mobile, deptId: this.state.selectedDepartment };
            console.log('employee => ' + JSON.stringify(employee));
            EmployeeService.createEmployee(employee)
                .then((res) => {
                    console.log("RESPONSE RECEIVED: ", res);
                    this.props.history.push('/employees');
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })
        } else {
            let employee = {id: this.state.id, ecode: this.state.ecode, name: this.state.name, dob: this.state.dob, gender: this.state.gender, mobile: this.state.mobile, deptId: this.state.selectedDepartment };
            console.log('employee => ' + JSON.stringify(employee));
            EmployeeService.updateEmployee(employee).then(res => {
                this.props.history.push('/employees');
            });
        }
    }

    changeEcodeHandler = (event) => {
        this.setState({ ecode: event.target.value });
    }

    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    }

    changeDobHandler = (event) => {
        this.setState({ dob: event});
    }

    changeGenderHandler = (event) => {
        this.setState({ gender: event.target.value });
    }

    changeMobileHandler = (event) => {
        this.setState({ mobile: event.target.value });
    }

    changeDeptIdHandler = (event) => {
        this.setState({ deptId: event.target.value });
    }

    cancel() {
        this.props.history.push('/');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Employee</h3>
        } else {
            return <h3 className="text-center">Update Employee</h3>
        }
    }

    handleChange = ({ target }) => {
        this.setState({
            selectedDepartment: target.value
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Employee Code: </label>
                                        <input placeholder="Employee Code" name="ecode" className="form-control"
                                            value={this.state.ecode} onChange={this.changeEcodeHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Employee Name: </label>
                                        <input placeholder="Employee Name" name="name" className="form-control"
                                            value={this.state.name} onChange={this.changeNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> DOB: </label>
                                        <DatePicker className="form-control" dateFormat="dd/MM/yyyy" selected={this.state.dob}
                                         onChange={this.changeDobHandler} maxDate={new Date()} placeholder="select Date of Birth" />
                                    </div>
                                    <div className="form-group">
                                        <label> Gender: </label>
                                        <div className="row">
                                            <div className="radio offset-1 col-md-3 ">
                                                <label>
                                                    <input
                                                        type="radio"
                                                        value="Male"
                                                        checked={this.state.gender === "Male"}
                                                        onChange={this.changeGenderHandler}
                                                    />
                                                    <span className="ml-1"> Male</span>
                                                </label>
                                            </div>
                                            <div className="radio  col-md-3">
                                                <label>
                                                    <input
                                                        type="radio"
                                                        value="Female"
                                                        checked={this.state.gender === "Female"}
                                                        onChange={this.changeGenderHandler}
                                                    />
                                                    <span className="ml-1"> Female</span>
                                                </label>
                                            </div>
                                            <div className="radio  col-md-3">
                                                <label>
                                                    <input
                                                        type="radio"
                                                        value="Other"
                                                        checked={this.state.gender === "Other"}
                                                        onChange={this.changeGenderHandler}
                                                    />
                                                    <span className="ml-1"> Other</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label> Mobile: </label>
                                        <input placeholder="Employee Mobile" name="mobile" className="form-control"
                                            value={this.state.mobile} onChange={this.changeMobileHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Department</label>
                                        <select className="form-control"
                                            value={this.state.selectedDepartment}
                                            onChange={this.handleChange}>
                                            <option>Select Department</option>
                                            {this.state.departments.filter(e => e.active == true).map((department) =>
                                                <option value={department.id} >{department.depName}</option>)}
                                        </select>
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent
