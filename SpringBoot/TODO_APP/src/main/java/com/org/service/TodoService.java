package com.org.service;

import java.util.List;

import com.org.model.TodoModel;

public interface TodoService {

	public List<TodoModel> getToDo();

	public int createToDo(TodoModel todoModel);

	public int updateToDo(TodoModel todoModel);

	public int deleteToDo(int todoId);

}
