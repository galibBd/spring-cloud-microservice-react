package com.jeeacademy.employee.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jeeacademy.employee.dto.ResponseTemplateDto;
import com.jeeacademy.employee.entity.Employee;
import com.jeeacademy.employee.service.EmployeeService;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/employee")
public class EmployeeController {

	@Autowired
	EmployeeService employeeService;
	
	@PostMapping("/create")
	public ResponseTemplateDto saveEmplyee(@RequestBody Employee employee) {
		return employeeService.saveEmployee(employee);
	}
	
	
	@PutMapping("/update")
	public Employee updateDpartment(@RequestBody Employee employee) {
		return employeeService.updateEmployee(employee);
		
	}
	
	@GetMapping("/")
	public List<Employee> findEmployees() {
		return employeeService.findEmployees();
	}
	
	@GetMapping("/{id}")
	public ResponseTemplateDto getEmployeeWithDepartment(@PathVariable Long id) {
		return employeeService.getEmployeeWithDepartment(id);
	}
	
	@DeleteMapping("/{id}")
	public String removeDepartment(@PathVariable Long id) {
		return employeeService.removeDepartment(id);
		
	}
}
