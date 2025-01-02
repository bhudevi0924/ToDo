import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { Urls } from "../urls";
import ManageToDo from "./ManageToDo";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Todo {
  id: number;
  task: string;
  status: string;
  createdAt: string;
  updatedAt: string | null;
}

const ToDoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [isDeleteTodo, setIsDeleteTodo] = useState(false);
  const [isToaster, setIsToaster] = useState(false);
  const [isError,setIsError] = useState(false);
  const [toasterMessage,setToasterMessage] =useState("");

  useEffect(() => {
    handleSave();
  }, []);

  const handleSave = () => {
    fetch(Urls.getToDoList)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error refreshing todos:", error));
  };

  const openCreateModal = () => {
    setCurrentTodo(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const openEditModal = (todo: Todo) => {
    setCurrentTodo(todo);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const deleteToDo =(todo:Todo) => {
    setIsDeleteTodo(true);
    setCurrentTodo(todo);
  }

  const onClose=()=>{
    setIsDeleteTodo(false);
  }

  const handleDelete = async (id:number) => {
    try {
      const response = await fetch(`${Urls.deleteToDo}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        setIsToaster(true);
        setIsError(true);
        setToasterMessage("Failed to delete todo!");
      } else{
        setIsToaster(true);
        setIsError(false);
        setToasterMessage("Deleted successfully!");
      }
    } catch (error) {
        setIsToaster(true);
        setIsError(true);
        setToasterMessage("Failed to delete todo!");
    }
    setIsDeleteTodo(false);
    handleSave();
  };

  const handleClose =() =>{
    setIsToaster(false);
  }

  return (
    <div>
      <h1>To-Do List</h1>
      <Button variant="contained" onClick={openCreateModal}>
        Add Task
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>{todo.task}</TableCell>
                <TableCell>{todo.status}</TableCell>
                <TableCell>{new Date(todo.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  {todo.updatedAt ? new Date(todo.updatedAt).toLocaleString() : "N/A"}
                </TableCell>
                <TableCell>
                  <Button onClick={() => openEditModal(todo)} disabled={todo.status === "Completed"}>
                    <EditIcon />
                  </Button>
                  <Button onClick={()=> deleteToDo(todo)} disabled={todo.status !== "Completed"}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isModalOpen && (
        <ManageToDo
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          todo={currentTodo || undefined}
          mode={modalMode}
          onSave={handleSave}
        />
      )}
        <Modal open={isDeleteTodo} onClose={onClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <h6>The deleted item can't be retreived again. Are you sure you want to delete this todo?</h6>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button onClick={onClose} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button variant="contained" onClick={()=>handleDelete(currentTodo ? currentTodo?.id:0)}>
                Delete
              </Button>
            </Box>
          </Box>
        </Modal>
        <Snackbar open={isToaster} autoHideDuration={6000} onClose={handleClose} 
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}>
          {!isError ? (
            <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {toasterMessage}
          </Alert>
          ):(
            <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {toasterMessage}
          </Alert>
          )}
        </Snackbar>
    </div>
  );
};

export default ToDoList;
