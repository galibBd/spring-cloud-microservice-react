package com.jeeacademy.employee.dto;

import com.jeeacademy.employee.entity.Employee;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseTemplateDto {
	
	private Employee employee;
	private Department Department;
	private String message;

}
