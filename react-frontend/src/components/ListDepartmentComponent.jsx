import React, { Component } from 'react'
import DepartmentService from '../services/DepartmentService';

class ListDepartmentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                departments: []
        }
        this.home = this.home.bind(this);
        this.addDepartment = this.addDepartment.bind(this);
        this.editDepartment = this.editDepartment.bind(this);
        this.deleteDepartment = this.deleteDepartment.bind(this);
    }

    deleteDepartment(id){
        DepartmentService.deleteDepartment(id).then( res => {
            this.setState({department: this.state.departments.filter(department => department.id !== id)});
        });
    }
    // viewDepartment(id){
    //     this.props.history.push(`/view-employee/${id}`);
    // }
    editDepartment(id){
        this.props.history.push(`/add-department/${id}`);
    }

    componentDidMount(){
        DepartmentService.getDepartments().then((res) => {
            this.setState({ departments: res.data});
        });
    }

    home(){
        this.props.history.push('/');
    }
    addDepartment(){
        this.props.history.push('/add-department/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Department List</h2>
                 <div className = "row">
                 <button className="btn btn-info mr-2" onClick={this.home}> Home</button>
                    <button className="btn btn-primary" onClick={this.addDepartment}> Add Department</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Department Id</th>
                                    <th> Department Name</th>
                                    <th> Status</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.departments.map(
                                        department => 
                                        <tr key = {department.id}>
                                             <td> {department.id} </td>   
                                             <td> {department.depName}</td>
                                             <td> {department.active == true? "Active":"Inactive"}</td>
                                             <td>
                                                 <button onClick={ () => this.editDepartment(department.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteDepartment(department.id)} className="btn btn-danger">Delete </button>
                                                 {/* <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">View </button> */}
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

export default ListDepartmentComponent
