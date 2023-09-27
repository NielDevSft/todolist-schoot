package com.scoot.todolist.models;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Data
@Builder
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Item {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "increment")
	@JsonFormat
    private Long id;
	
	@JsonFormat
    private String description;
	
	@JsonFormat
    private Date dueDate;
	
	@JsonFormat
    private int priority;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date dtaCreatedAt;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date dtaUpdatedAt;
}
