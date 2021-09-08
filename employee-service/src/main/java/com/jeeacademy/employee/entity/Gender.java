package com.jeeacademy.employee.entity;

import lombok.Data;

public enum Gender {
	
	MALE(1),
	FEMALE(2),
	OTHERs(3);
	
	private int gId;
	
	Gender(int gId){
		this.gId = gId;
	}
	
}
