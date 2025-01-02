package com.org.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.org.model.TodoModel;

@Mapper
public interface TodoMapper {

	@Select("select * from todolist")
	@Results({ @Result(property = "createdAt", column = "created_at"),
		 	   @Result(property = "updatedAt", column = "updated_at")})
	List<TodoModel> getToDo();
	
	@Insert("insert into todolist(task,status,created_at) values(#{task},#{status},CURRENT_TIMESTAMP)")
	public int createToDo(TodoModel todoModel);

	public String updateToDo ="<script>update todolist <set> "
			+ "<if test='task != null'>task=#{task},</if>"
			+ "<if test='status != null'>status=#{status},</if>"
			+ " updated_at=CURRENT_TIMESTAMP "
			+ "</set> where id=#{id}</script>";
	@Update(updateToDo)
	public int updateToDo(TodoModel todoModel);

	@Delete("delete from todolist where id=#{todoId}")
	public int deleteToDo(int todoId);
	
}
