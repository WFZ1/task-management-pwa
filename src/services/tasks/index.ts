import { Task } from '@/types';
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore/lite';
import { db } from '../db';

export const getTasks = async (): Promise<Task[] | null | undefined> => {
    const tasksCol = collection(db, 'tasks');
    const tasksSnapshot = await getDocs(tasksCol);
    const tasksList = tasksSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));

    return tasksList as Task[];
};

export const getTask = async (taskId: Task['id']): Promise<Task | null | undefined> => {
    const docRef = doc(db, 'tasks', taskId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        throw Error();
    }

    const data = {
        ...docSnap.data(),
        id: taskId,
    };

    return data as Task;
};

export const createTask = async (task: Omit<Task, 'id' | 'isCompleted'>) => {
    const tasksCol = collection(db, 'tasks');
    await addDoc(tasksCol, task);
};

export const updateTask = async (taskId: Task['id'], taskData: Omit<Task, 'id' | 'isCompleted'>) => {
    const docRef = doc(db, 'tasks', taskId);
    await updateDoc(docRef, taskData);
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
