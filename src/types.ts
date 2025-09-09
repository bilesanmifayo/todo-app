export interface Task{
    id: number;
    text: string;
    completed: boolean;
    priority: 'Low' | 'Medium' | 'High';
}