import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';
import { Urls } from '../urls';

interface Todo {
  id?: number;
  task: string;
  status: string;
}

interface ToDoProps {
  open: boolean;
  onClose: () => void;
  todo?: Todo;
  mode: 'create' | 'edit';
  onSave: () => void;
}

const ManageToDo: React.FC<ToDoProps> = ({ open, onClose, todo, mode, onSave }) => {
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('not started');

  useEffect(() => {
    if (todo) {
      setTask(todo.task || '');
      setStatus(todo.status || 'not started');
    }
  }, [todo]);

  const handleSubmit = async () => {
    try {
      const payload = { task, status };

      const response = await fetch(
        mode === 'edit' && todo?.id ? `${Urls.updateToDo}/${todo.id}` : Urls.addToDo,
        {
          method: mode === 'edit' ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to save to-do');
      }

      console.log(`To-Do ${mode === 'edit' ? 'updated' : 'added'} successfully`);
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving to-do:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
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
        <Typography variant="h6" component="h2" gutterBottom>
          {mode === 'edit' ? 'Edit To-Do' : 'Add New To-Do'}
        </Typography>
        <TextField
          label="Task"
          variant="outlined"
          fullWidth
          margin="normal"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Typography variant="subtitle1" gutterBottom>
          Status
        </Typography>
        <RadioGroup
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <FormControlLabel value="Not started" control={<Radio />} label="Not Started" />
          <FormControlLabel value="In Progress" control={<Radio />} label="In Progress" />
          <FormControlLabel value="Completed" control={<Radio />} label="Completed" />
        </RadioGroup>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ManageToDo;
