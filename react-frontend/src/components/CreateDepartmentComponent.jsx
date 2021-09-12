import React, { Component } from 'react'
import DepartmentService from '../services/DepartmentService';

class CreateDepartmentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            depName: '',
            isActive: true,

        }
        this.changeDepNameHandler = this.changeDepNameHandler.bind(this);
        this.saveOrUpdateDepartment = this.saveOrUpdateDepartment.bind(this);
        this.toggleChange = this.toggleChange.bind(this);
    }

    componentDidMount() {

        if (this.state.id === '_add') {
            this.setState({
                isActive: true,
              });
            return
        } else {
            DepartmentService.getDepartmentById(this.state.id).then((res) => {
                let department = res.data;
                this.setState({
                    id: this.state.id,
                    depName: department.depName,
                    isActive: department.active,
                });
                this.state.isActive = department.active;
            });
        }
    }

    saveOrUpdateDepartment = (e) => {
        e.preventDefault();
        if (this.state.id === '_add') {
            let department = { depName: this.state.depName, active: this.state.isActive };
            DepartmentService.createDepartment(department)
                .then((res) => {
                    console.log("RESPONSE RECEIVED: ", res);
                    this.props.history.push('/departments');
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })
        } else {
            let department = {id: this.state.id, depName: this.state.depName, active: this.state.isActive };
           
            DepartmentService.updateDepartment(department).then(res => {
                this.props.history.push('/departments');
            });
        }
    }

    changeDepNameHandler = (event) => {
        this.setState({ depName: event.target.value });
    }

    changeActiveHandler = (event) => {
        this.setState({ isActive: event.target.value });
    }

    cancel() {
        this.props.history.push('/departments');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Department</h3>
        } else {
            return <h3 className="text-center">Update Department</h3>
        }
    }

    toggleChange = () => {
        this.state.isActive = !this.state.isActive;
        console.log('active  => ' + JSON.stringify( this.state.isActive));
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
                                        <label> Department Name: </label>
                                        <input placeholder="Department Name" name="depName" className="form-control"
                                            value={this.state.depName} onChange={this.changeDepNameHandler} />
                                    </div>
                                    
                                    <div className="form-group">
                                        <div className="form-check">
                                        <label className ="form-check-label" >
                                            <input className="form-check-input" type="checkbox" defaultChecked={this.state.isActive}
                                             onChange={this.toggleChange}/>
                                            Is Active?
                                            </label>
                                        </div>
                                    </div>


                                    <button className="btn btn-success" onClick={this.saveOrUpdateDepartment}>Save</button>
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

export default CreateDepartmentComponent
