package com.org.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.org.model.TodoModel;
import com.org.service.TodoService;

@RestController
public class TodoController {
	
	@Autowired
	private TodoService todoService;
	
	@GetMapping("/GetTodoList")
	public List<TodoModel> getToDo() {
		return todoService.getToDo();
	}

	@PostMapping("/CreateToDo")
	public int createToDo(@RequestBody TodoModel todoModel) {
		return todoService.createToDo(todoModel);
	}
	
	@PutMapping("/UpdateToDo/{id}")
	public int updateToDo(@PathVariable int id,@RequestBody TodoModel todoModel) {
		todoModel.setId(id);
		return todoService.updateToDo(todoModel);
	}
	
	@DeleteMapping("/DeleteToDo/{id}")
	public int deleteToDo(@PathVariable int id) {
		return todoService.deleteToDo(id);
	}
}
