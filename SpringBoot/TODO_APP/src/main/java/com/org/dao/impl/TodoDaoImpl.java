package com.org.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.org.dao.TodoDao;
import com.org.mapper.TodoMapper;
import com.org.model.TodoModel;

@Repository
public class TodoDaoImpl implements TodoDao {
	
	@Autowired
	private TodoMapper todoMapper;

	@Override
	public List<TodoModel> getToDo() {
		return todoMapper.getToDo();
	}

	@Override
	public int createToDo(TodoModel todoModel) {
		return todoMapper.createToDo(todoModel);
	}

	@Override
	public int updateToDo(TodoModel todoModel) {
		// TODO Auto-generated method stub
		return todoMapper.updateToDo(todoModel);
	}

	@Override
	public int deleteToDo(int todoId) {
		// TODO Auto-generated method stub
		return todoMapper.deleteToDo(todoId);
	}
	

}
