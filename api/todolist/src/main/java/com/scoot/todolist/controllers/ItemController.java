package com.scoot.todolist.controllers;
import java.sql.Date;
import java.util.Calendar;
import java.util.Optional;
import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.scoot.todolist.models.Item;
import com.scoot.todolist.repositories.ItemRepository;

@Controller	// This means that this class is a Controller
@RequestMapping(path="/api/item") 
@CrossOrigin(origins = "http://localhost:4200")
public class ItemController {
	@Autowired 
	
	private ItemRepository itemRepository;
	@PostMapping(path="") 
	public @ResponseBody Item create(@RequestBody Item item) {
		Item n = new Item();
		n.setDueDate(item.getDueDate());
		n.setDescription(item.getDescription());
		n.setPriority(item.getPriority());
		n.setDtaCreatedAt(new Date(System.currentTimeMillis()));
		n.setDtaUpdatedAt(new Date(System.currentTimeMillis()));
		Item itemSavad = itemRepository.save(n);
		
		return itemSavad;
	}

	@PutMapping(path="/{id}")
	public @ResponseBody Item update(@PathVariable(value = "id") int id,@RequestBody Item item) throws Exception {
		Item n = itemRepository.findById(id).orElse(null);
		if(n == null) { 
			throw new Exception("Task not found");
		}
	
		n.setDueDate(item.getDueDate());
		n.setDescription(item.getDescription());
		n.setPriority(item.getPriority());
		n.setDtaUpdatedAt(new Date(System.currentTimeMillis()));
		
		Item itemSavad = itemRepository.save(n);
		return itemSavad;
	}

	@GetMapping(path="/all")
	public @ResponseBody Iterable<Item> getAll() {

		return itemRepository.findAll();
	}
	@GetMapping(path="/{id}")
	public @ResponseBody Optional<Item> getById(@PathVariable(value = "id") int id) {
		return itemRepository.findById(id);
	}
	@PostMapping(path="/getAllByFilters")
	public @ResponseBody Iterable<Item> getAllByFilters(@RequestBody Item item){
		if(item.getDescription() != null || item.getPriority() != 0) {
			return itemRepository.findByDescriptionContainingOrPriority(item.getDescription(), item.getPriority());
		}
		return itemRepository.findAll();
		
	}
	@DeleteMapping(path="/{id}")
	public @ResponseBody void delete(@PathVariable(value = "id") int id) throws Exception {
		Item item = itemRepository.findById(id).orElse(null);
		if(item == null) { 
			throw new Exception("Task not found");
		}
		itemRepository.delete(item);
	}
}
