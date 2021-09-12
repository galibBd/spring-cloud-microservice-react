import axios from 'axios';

const DEPARTMENT_API_BASE_URL = "http://localhost:9191/departments";

class DepartmentService {
    headers = {
        "Access-Control-Allow-Origin": "http://localhost:3000",
      }

    getDepartments(){
        return axios.get(DEPARTMENT_API_BASE_URL + '/');
    }

    createDepartment(department){
 
        return axios.post(DEPARTMENT_API_BASE_URL + '/create', department,{headers: this.headers});
    }

    getDepartmentById(departmentId){
        return axios.get(DEPARTMENT_API_BASE_URL + '/' + departmentId);
    }

    updateDepartment(department){
        return axios.put(DEPARTMENT_API_BASE_URL + '/update', department,{headers: this.headers});
    }

    deleteDepartment(departmentId){
        return axios.delete(DEPARTMENT_API_BASE_URL + '/' + departmentId);
    }
}

export default new DepartmentService()