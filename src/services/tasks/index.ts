import { Task } from '@/types';
import mockTasks from '@/components/tasks/data/tasks.json';
import { addDoc, collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../db';

export const getTasks = async (): Promise<Task[] | null | undefined> => {
    const tasksCol = collection(db, 'tasks');
    const tasksSnapshot = await getDocs(tasksCol);
    const tasksList = tasksSnapshot.docs.map((doc) => doc.data());

    return tasksList as Task[];
};

export const getTask = async (taskId: Task['id']): Promise<Task | null | undefined> => {
    // const { data, error }: DBQueryResponse<Task> = await db.from('tasks').select().eq('id', taskId).single();

    // if (error) {
    //     throw error;
    // }

    // return data;

    console.log('taskId', taskId);

    return mockTasks[0];
};

export const createTask = async (task: Omit<Task, 'id' | 'isCompleted'>) => {
    const tasksCol = collection(db, 'tasks');
    await addDoc(tasksCol, task);
};

export const updateTask = async (taskId: Task['id'], taskData: Omit<Task, 'id' | 'isCompleted'>) => {
    // const { error } = await db.from('tasks').update(taskData).eq('id', taskId);
    // if (error) {
    //     throw error;
    // }

    console.log('taskId', taskId);
    console.log('taskData', taskData);
};

export const completeTask = async (taskId: Task['id'], isCompleted: Task['isCompleted']) => {
    // const { error } = await db.from('tasks').update({ isCompleted }).eq('id', taskId);
    // if (error) {
    //     throw error;
    // }

    console.log('taskId', taskId);
    console.log('isCompleted', isCompleted);
};

export const deleteTask = async (taskId: Task['id']) => {
    // const { error } = await db.from('tasks').delete().eq('id', taskId);
    // if (error) {
    //     throw error;
    // }

    console.log('taskId', taskId);
};
