package com.scoot.todolist.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.scoot.todolist.models.Item;



// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface ItemRepository extends CrudRepository<Item, Integer> {
	 List<Item> findByDescriptionContainingOrPriority(String description, int priority);
}