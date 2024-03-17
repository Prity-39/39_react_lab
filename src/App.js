// import logo from './logo.svg';
// import './App.css';
// import Login from './pages/login';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from './pages/home'
// import Register from './pages/registration'

// function App() {
//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home />}/>
//           <Route path="/login" element={<Login />}/>
//           <Route path="/register" element={<Register />}/>

//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;



// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [textboxes, setTextboxes] = useState([{ id: 0, value: 0 }]);
//   const [sum, setSum] = useState(0);
//   const [errorMessage, setErrorMessage] = useState('');

//   const addTextbox = () => {
//     const id = textboxes.length > 0 ? textboxes[textboxes.length - 1].id + 1 : 0;
//     setTextboxes([...textboxes, { id, value: 0 }]);
//   };

//   const deleteTextbox = (id) => {
//     const newTextBoxes = textboxes.filter((textbox) => textbox.id !== id);
//     setTextboxes(newTextBoxes);
//     setSum(newTextBoxes.reduce((acc, curr) => acc + curr.value, 0));
//   };

//   const handleChange = (id, event) => {
//     const newValue = event.target.value;
//     if (!/^\d+$/.test(newValue)) {
//       setErrorMessage('Please enter a valid number');
//       return;
//     }
//     setErrorMessage('');
//     const newTextBoxes = textboxes.map((textbox) =>
//       textbox.id === id ? { ...textbox, value: parseInt(newValue) } : textbox
//     );
//     setTextboxes(newTextBoxes);
//     setSum(newTextBoxes.reduce((acc, curr) => acc + curr.value, 0));
//   };

//   return (
//     <div className="App">
//       {textboxes.map((textbox) => (
//         <div key={textbox.id} className="textbox-container">
//           <input
//             type="text"
//             value={textbox.value}
//             onChange={(event) => handleChange(textbox.id, event)}
//           />
//           <button onClick={() => deleteTextbox(textbox.id)}>Delete</button>
//         </div>
//       ))}
//       <button onClick={addTextbox}>Add</button>
//       <div>Total: {sum}</div>
//       {errorMessage && <div className="error-message">{errorMessage}</div>}
//     </div>
//   );
// }

// export default App;

// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function TaskManager() {
//   const [tasks, setTasks] = useState([]);
//   const [taskInput, setTaskInput] = useState('');

//   const handleInputChange = (event) => {
//     setTaskInput(event.target.value);
//   };

//   const handleAddTask = () => {
//     if (taskInput.trim() !== '') {
//       setTasks([...tasks, taskInput]);
//       setTaskInput('');
//     }
//   };

//   const handleDeleteTask = (index) => {
//     const updatedTasks = tasks.filter((task, i) => i !== index);
//     setTasks(updatedTasks);
//   };

//   const handleEditTask = (index) => {
//     const editedTask = prompt("Edit task:", tasks[index]);
//     if (editedTask !== null && editedTask.trim() !== '') {
//       const updatedTasks = [...tasks];
//       updatedTasks[index] = editedTask;
//       setTasks(updatedTasks);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h1>Task Manager</h1>
//       <div className="input-group mb-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Enter task"
//           value={taskInput}
//           onChange={handleInputChange}
//         />
//         <div className="input-group-append">
//           <button className="btn btn-primary" type="button" onClick={handleAddTask}>
//             Add Task
//           </button>
//         </div>
//       </div>
//       <div className="d-flex flex-wrap">
//         {tasks.map((task, index) => (
//           <div className="card m-2 position-relative" key={index} style={{ width: 'calc(100% - 20px)' }}>
//             <div className="card-body d-flex justify-content-between align-items-center">
//               <h5 className="card-title mb-0">{task}</h5>
//               <div>
//                 <button
//                   type="button"
//                   className="btn btn-outline-primary btn-sm me-2"
//                   onClick={() => handleEditTask(index)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-outline-danger btn-sm"
//                   onClick={() => handleDeleteTask(index)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default TaskManager;





import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function TaskComponent({ taskData, index, editTask, updateTask, deleteTask }) {
  const [editedTask, setEditedTask] = useState({ task: taskData.task, description: taskData.description });

  const handleTaskUpdate = () => {
    updateTask(index, editedTask.task, editedTask.description);
  };

  return (
    <div className="card mt-4 shadow">
      <div className="card-body">
        {taskData.editing ? (
          <div>
            <input
              type="text"
              className="form-control mb-2"
              value={editedTask.task}
              onChange={(e) => setEditedTask({ ...editedTask, task: e.target.value })}
            />
            <input
              type="text"
              className="form-control mb-2"
              value={editedTask.description}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            />
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary me-2" onClick={handleTaskUpdate}>
                OK
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h5 className="card-title">{taskData.task}</h5>
            <p className="card-text">{taskData.description}</p>
          </div>
        )}
        <div className="float-right">
          <button className="btn btn-primary mr-2" onClick={() => editTask(index)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => deleteTask(index)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    setTaskList([
      { task: 'React', description: 'React is a JavaScript library developed by Facebook' },
      { task: 'Task', description: 'Default Description' }
    ]);
  }, []);

  const addNewTask = () => {
    setTaskList([...taskList, { task: 'Add Title here', description: 'Add Your Description Here' }]);
  };

  const modifyTask = (index) => {
    const updatedTasks = taskList.map((task, i) =>
      i === index ? { ...task, editing: true } : task
    );
    setTaskList(updatedTasks);
  };

  const saveTaskChanges = (index, newTask, newDescription) => {
    const updatedTasks = taskList.map((task, i) =>
      i === index ? { ...task, task: newTask, description: newDescription, editing: false } : task
    );
    setTaskList(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = taskList.filter((task, i) => i !== index);
    setTaskList(updatedTasks);
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-primary position-fixed top-0 end-0 mt-3 me-4" onClick={addNewTask}>
        Add New Task
      </button>
      {taskList.map((taskData, index) => (
        <TaskComponent
          key={index}
          taskData={taskData}
          index={index}
          editTask={modifyTask}
          updateTask={saveTaskChanges}
          deleteTask={removeTask}
        />
      ))}
    </div>
  );
}

export default App;
