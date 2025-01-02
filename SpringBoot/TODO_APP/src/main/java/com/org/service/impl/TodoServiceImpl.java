package com.org.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.org.dao.TodoDao;
import com.org.model.TodoModel;
import com.org.service.TodoService;

@Service
public class TodoServiceImpl implements TodoService {
	
	@Autowired
	private TodoDao todoDao;

	@Override
	public List<TodoModel> getToDo() {
		
		return todoDao.getToDo();
	}

	@Override
	public int createToDo(TodoModel todoModel) {
		return todoDao.createToDo(todoModel);
	}

	@Override
	public int updateToDo(TodoModel todoModel) {
		// TODO Auto-generated method stub
		return todoDao.updateToDo(todoModel);
	}

	@Override
	public int deleteToDo(int todoId) {
		// TODO Auto-generated method stub
		return todoDao.deleteToDo(todoId);
	}

}
