import { useState } from 'react';
import { Task } from '../types'; 

interface TaskFormProps {
    onAddTask: (text: string, priority: 'Low' | 'Medium' | 'High') => void;
}

export default function TaskForm ({ onAddTask }: TaskFormProps){
    const [newTask, setNewTask] = useState<string>('');
    const [newTaskPriority, setNewTaskPriority] = useState<'Low' | 'Medium' | 'High' > ('Medium');

    const handleAddTask = () => {
        if (newTask.trim() === '') return;
        onAddTask(newTask, newTaskPriority);
        setNewTask(' ');
        setNewTaskPriority('Medium');
    };

    return (
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
            className="p-2 border border-gray-300 rounded-lg">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
            >
                Add
            </button>
        </div>
    )
}