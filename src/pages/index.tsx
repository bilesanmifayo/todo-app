import { useState, useEffect } from 'react';
import Task from '../components/Tasks';
import TaskForm from '../components/TaskForm';
import { Task as TaskType } from '../types';

//interface Task {
 // id: number;
 // text: string;
 // completed: boolean;
 // priority: 'Low' | 'Medium' | 'High';
//}

export default function Home(){
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [editingTaskId , setEditingTaskId] = useState<number | null> (null);
  const [editingTaskText, setEditingTaskText] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined'){
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks){
        try{
          setTasks(JSON.parse(savedTasks));
        } catch(error){
          console.error('Error parsing localStorage Tasks', error);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined'){
      try{
        localStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving to localStorage: ', error);
      }
    }
  }, [tasks]);

  const addTask = (text: string, priority: 'Low' | 'Medium' | 'High') => {
    setTasks([...tasks, {id: Date.now(), text, completed: false, priority }]);
  }

  const toggleComplete = (id: number) => {
    setTasks(tasks.map((task:TaskType) => 
     task.id === id ? {...task, completed: !task.completed } : task));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task: TaskType) => task.id !== id));
  };

  const startEditing = (id: number, text: string) => {
    setEditingTaskId(id);
    setEditingTaskText(text);
  };

  const saveEdit = (id: number, text: string) => {
    if (text.trim() === '') return;
    setTasks(tasks.map((task: TaskType) => 
      task.id === id ? {...task, text} : task
    ));
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
        <h1 className="text-2xl font-bold mb-4 text-center"> To-Do List </h1>
        <TaskForm onAddTask={addTask} />
        <ul className="space-y-2">
          {tasks.map ((task: TaskType) => (
            <Task
             key={task.id}
             task={task}
             onToggleComplete={toggleComplete}
             onDelete={deleteTask}
             onStartEditing={startEditing}
             onSaveEdit={saveEdit}
             onCancelEdit={cancelEdit}
             isEditing={editingTaskId === task.id}
             editingText={editingTaskText}
             setEditingText={setEditingTaskText}
             />
          ))}
        </ul>
      </div>
    </div>
  )
}