import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

// link to initial tutorial: https://blog.lewagon.com/skills/how-to-build-a-single-page-application-spa-with-rails-react/

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // load tasks when the app starts:
  useEffect = (() => {
    axios.get('http://localhost:3000/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("couldn't fetch tasks", error);
      });
  }, []);

  const addTask = () => {
    if (newTask.trim()) {
      axios.post('http://localhost:3000/tasks', {title: newTask, completed: false})
      .then((response) => {
        setTasks([...tasks, response.data]); // add new task
        setNewTask('');
      })
      .catch((error) => {
        console.error("couldn't add the task", error);
      });
    }
  };

  const toggleTaskCompletion = (taskId, completed) => {
    axios.put(`http://localhost:3000/tasks/${taskId}`, {completed: !completed})
    .then((response) => {
      setTasks(
        tasks.map((task) =>
        task.id === taskId ? response.data : task
        )
      );
    })
    .catch((error) => {
      console.error("couldn't update task", error);
    });
  };

  return (

    <div>
      <h1>⭐ Let's get stuff done ⭐</h1>
      <ul>
        {tasks.map((task) => (
          <li
          key={task.id}
          onClick={() => toggleTaskCompletion(task.id, task.completed)}
          style={{
            textDecoration: task.completed ? 'line-through' : 'none',
            cursor: 'pointer',
          }}
          >
            {task.title}
          </li>
        ))}
      </ul>
      <input
      type = 'text'
      value = {newTask}
      onChange = {(e) => setNewTask(e.target.value)}
      placeholder='Add a new task! ✍️'
      />

      <button onClick = {addTask}> Add task!</button>
    </div>
  );
}

export default App;
