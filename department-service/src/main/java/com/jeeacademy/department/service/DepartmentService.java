package com.jeeacademy.department.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jeeacademy.department.entity.Department;
import com.jeeacademy.department.repository.DepartmentRepository;

import lombok.extern.slf4j.Slf4j;


@Service
@Slf4j
public class DepartmentService {
	
	@Autowired
	DepartmentRepository departmentRepository;

	public Department saveDepartment(Department department) {
		
		Department dpt =  departmentRepository.save(department);
		log.info("inside department service :: "+dpt);
		return dpt;
	}

	public Department updateDepartment(Department department) {
		return  departmentRepository.save(department);
	}

	public Department findDepartmentById(Long id) {
		Department dpt = departmentRepository.findDepartmentById(id);
		log.info("inside department service :: "+dpt);
		return dpt;
	}

	public List<Department> getDepartmentList() {
		return departmentRepository.findAll();
	}

	public String removeDepartment(Long id) {
		 departmentRepository.deleteById(id);
		 return "Successfully Deleted!!";
	}


}
