package com.jeeacademy.department.controller;

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

import com.jeeacademy.department.entity.Department;
import com.jeeacademy.department.service.DepartmentService;

import lombok.extern.slf4j.Slf4j;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/departments")
@Slf4j
public class DepartmentController {

	@Autowired
	DepartmentService departmentService;
	
	@PostMapping("/create")
	public Department saveDpartment(@RequestBody Department department) {
		log.info("logging inside department create :: "+department);
		return departmentService.saveDepartment(department);
		
	}
	
	@PutMapping("/update")
	public Department updateDpartment(@RequestBody Department department) {
		log.info("logging inside department update :: "+department);
		return departmentService.updateDepartment(department);
		
	}
	
	@GetMapping("/{id}")
	public Department findDepartmentById(@PathVariable Long id) {
		return departmentService.findDepartmentById(id);
		
	}
	
	@GetMapping("/")
	public List<Department> getDepartmentList() {
		return departmentService.getDepartmentList();
		
	}
	
	@DeleteMapping("/{id}")
	public String removeDepartment(@PathVariable Long id) {
		return departmentService.removeDepartment(id);
		
	}
}
