package com.org.dao;

import java.util.List;

import com.org.model.TodoModel;

public interface TodoDao {

	List<TodoModel> getToDo();

	int createToDo(TodoModel todoModel);

	int updateToDo(TodoModel todoModel);

	int deleteToDo(int todoId);

}
