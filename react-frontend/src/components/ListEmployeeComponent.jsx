import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import Moment from 'react-moment'

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: []
        }
        this.home = this.home.bind(this);
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.departmentList = this.departmentList.bind(this);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }
    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }
    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    home(){
        this.props.history.push('/');
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }
    
    departmentList(){
        this.props.history.push('/departments');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Employees List</h2>
                 <div className = "row">
                    <button className="btn btn-info mr-2" onClick={this.home}> Home</button>
                    <button className="btn btn-success mr-2" onClick={this.departmentList}> Department List</button>
                    <button className="btn btn-primary mr-2" onClick={this.addEmployee}> Add Employee</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Employee Code</th>
                                    <th> Employee Name</th>
                                    <th> Employee DOB</th>
                                    <th> Employee Gender</th>
                                    <th> Employee Mobile</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.id}>
                                             <td> { employee.ecode} </td>   
                                             <td> {employee.name}</td>
                                             <td><Moment format="DD-MMM-YYYY" date={employee.dob} /></td>
                                             <td> {employee.gender}</td>
                                             <td> {employee.mobile}</td>
                                             <td>
                                                 <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListEmployeeComponent
