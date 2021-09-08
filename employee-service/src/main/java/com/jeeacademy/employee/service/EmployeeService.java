package com.jeeacademy.employee.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.client.RestTemplate;

import com.jeeacademy.employee.dto.Department;
import com.jeeacademy.employee.dto.ResponseTemplateDto;
import com.jeeacademy.employee.entity.Employee;
import com.jeeacademy.employee.repository.EmployeeRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@ResponseStatus
public class EmployeeService {

	@Autowired
	EmployeeRepository employeeRepository;
	@Autowired
	RestTemplate restTemplate;

	public ResponseTemplateDto saveEmployee(Employee employee) {
		ResponseTemplateDto resTemp = new ResponseTemplateDto();
		if(employee.getEcode() == null) {
			resTemp.setMessage("please ente employee code");
			return resTemp;
		}
		Employee emp = employeeRepository.save(employee);
		resTemp.setEmployee(emp);
		return  resTemp;
	}

	public Employee updateEmployee(Employee employee) {
		return  employeeRepository.save(employee);
	}
	
	public Employee findEmployeeById(Long id) {
		return employeeRepository.findEmployeeById(id);
	}

	public ResponseTemplateDto getEmployeeWithDepartment(Long id) {
		ResponseTemplateDto restempDto = new ResponseTemplateDto();
		Employee employee = employeeRepository.findEmployeeById(id);
		Department department = restTemplate.getForObject("http://DEPARTMENT-SERVICE/departments/"+employee.getDeptId(), Department.class);		
		
		restempDto.setEmployee(employee);
		restempDto.setDepartment(department);
//		log.info("get employeeWithDepartment response"+ restTemplate);
		return restempDto;
	}

	public List<Employee> findEmployees() {
		return employeeRepository.findAll();
	}

	public String removeDepartment(Long id) {
		employeeRepository.deleteById(id);
		return "Successfully Deleted!!";
	}

	
	
	
}
