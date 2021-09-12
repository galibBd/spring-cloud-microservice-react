import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:9191/employee";

class EmployeeService {
    headers = {
        "Access-Control-Allow-Origin": "http://localhost:3000",
      }
    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL + '/');
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL + '/create', employee,{headers: this.headers}
          );
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee){
        return axios.put(EMPLOYEE_API_BASE_URL + '/update', employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }
}

export default new EmployeeService()