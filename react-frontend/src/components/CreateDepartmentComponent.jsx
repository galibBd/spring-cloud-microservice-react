import React, { Component } from 'react'
import DepartmentService from '../services/DepartmentService';

class CreateDepartmentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            depName: '',
            isActive: true,

        }
        this.changeDepNameHandler = this.changeDepNameHandler.bind(this);
        this.changeActiveHandler = this.changeActiveHandler.bind(this);
        this.saveOrUpdateDepartment = this.saveOrUpdateDepartment.bind(this);
    }

    // step 3
    componentDidMount() {

        // step 4
        if (this.state.id === '_add') {
            this.setState({
                isActive: true,
              });
            return
        } else {
            DepartmentService.getDepartmentById(this.state.id).then((res) => {
                let department = res.data;
                console.log("***",department);
                this.setState({
                    depName: department.depName,
                    isActive: department.active,
                });
            });
        }
    }

    saveOrUpdateDepartment = (e) => {
        e.preventDefault();
        let department = { depName: this.state.depName, active: this.state.isActive };
        console.log('department => ' + JSON.stringify(department));

        // step 5
        if (this.state.id === '_add') {
            DepartmentService.createDepartment(department)
                // .then(res =>{
                //     this.props.history.push('/deparment');
                // }
                .then((res) => {
                    console.log("RESPONSE RECEIVED: ", res);
                    this.props.history.push('/deparments');
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })
        } else {
            DepartmentService.updateDepartment(department, this.state.id).then(res => {
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
        this.setState({
          isActive: !this.state.isActive,
        });
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
