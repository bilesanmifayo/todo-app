import { useState, useEffect } from 'react';  

// Define Task Interface
interface Task  {
    id: number;
    text: string;
    completed: boolean;
    priority: 'Low' | 'Medium' | 'High';
  }
export default function Home(){
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [newTaskPriority, setNewTaskPriority] = useState<'Low' | 'Medium' | 'High'>('Medium')
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskText, setEditingTaskText] = useState<string>('');

// Load Tasks from localstorage on client-side mount
  useEffect(() => {
    if (typeof window !== 'undefined'){
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks){
        try{
          setTasks(JSON.parse(savedTasks));
        } catch(error)
        {
          console.error('Error parsing localstorage tasks: ', error);
      }
    }
  }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined'){
      try{
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }catch(error){
      console.error('Error saving to localStorage: ', error);
    }
    }
  }, [tasks]);

  const addTask = () =>{
    if (newTask.trim() === '') return; 
    setTasks([...tasks, {id: Date.now(), text: newTask, completed: false,
      priority: newTaskPriority
    }]);
    setNewTask('');
    setNewTaskPriority('Medium');
  };
  const toggleComplete = (id: number) => {
  setTasks(tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  ));
};
  const deleteTask = (id: number) => {
  setTasks(tasks.filter(task => task.id !== id));
};
  const startEditing = (id: number, text: string) => {
    setEditingTaskId(id);
    setEditingTaskText(text);
  };
  const saveEdit = (id:number) => {
    if (editingTaskText.trim() === '') return;
    setTasks(tasks.map((task: Task) => 
    task.id === id ? {...task, text: editingTaskText} : task ));
    setEditingTaskId(null);
    setEditingTaskText('');
  };
  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditingTaskText('');
  };

return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>

        <div className="flex mb-4 space-x-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          <select
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value as 'Low' | 'Medium' | 'High')}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button
            onClick={addTask}
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map((task: Task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between p-3 rounded-lg ${
                task.priority === 'High' ? 'bg-red-50' :
                task.priority === 'Medium' ? 'bg-yellow-50' :
                'bg-green-50'
              }`}
            >
              {editingTaskId === task.id ? (
                <div className="flex flex-1 space-x-2">
                  <input
                    type="text"
                    value={editingTaskText}
                    onChange={(e) => setEditingTaskText(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
                  />
                  <button
                    onClick={() => saveEdit(task.id)}
                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.text} ({task.priority})
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEditing(task.id, task.text)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleComplete(task.id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      {task.completed ? 'Undo' : 'Done'}
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}