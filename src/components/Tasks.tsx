import type { Task } from '../types.ts';


interface TaskProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onStartEditing: (id: number, text: string) => void;
  onSaveEdit: (id: number, text: string) => void;
  onCancelEdit: () => void;
  isEditing: boolean;
  editingText: string;
  setEditingText: (text: string) => void;
}

export default function Task({
    task,
    onToggleComplete,
    onDelete,
    onStartEditing,
    onSaveEdit,
    onCancelEdit, 
    isEditing,
    editingText, 
    setEditingText,
}: TaskProps) {
    return (
        <li
          className={`flex items-center justify-between p-3 rounded-lg ${
            task.priority === 'High' ? 'bg-red-50':
            task.priority === 'Medium' ? 'bg-yellow-50': 'bg-green-50'
            }`}
            >
                {isEditing ? (
                    <div className="flex flex-1 space-x-2">
                        <input
                         type="text"
                         value={editingText}
                         onChange={(e) => setEditingText(e.target.value)}
                         className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
                         />
                        <button
                         onClick={() => onSaveEdit(task.id, editingText)}
                         className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                         >
                            Save
                        </button>                  
                        <button
                          onClick={onCancelEdit}
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
                         onClick={() => onStartEditing(task.id, task.text)}
                         className="text-blue-500 hover:text-blue-700">
                            Edit
                        </button>
                        <button
                        onClick={() => onToggleComplete(task.id)}
                        className="text-green-500 hover:text-green-700"
                        >
                            {task.completed ? 'Undo' : 'Done'}
                        </button>
                        <button
                        onClick={() => onDelete(task.id)}
                        className="text-red-500 hover:text-red-700">
                            Delete
                        </button>
                    </div>
                    </>
                )}
            </li>
    )
}