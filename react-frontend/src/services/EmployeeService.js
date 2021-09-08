import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:9191/employee";

class EmployeeService {

    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL + '/');
    }

    // axios.{ method: 'post', url: '/endpoint', headers: { 'Content-Type': 'application/json', },
    //  proxy: createProxyMiddleware({ target: 'https://www.api.com', changeOrigin: true}), data: data };

    createEmployee(employee){
        const headers = {
            // 'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "http://localhost:3000",
          }

        return axios.post(EMPLOYEE_API_BASE_URL + '/create', employee,{headers: headers}
          );
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }
}

export default new EmployeeService()