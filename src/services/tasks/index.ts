import { Task } from '@/types';
import { addDoc, collection, CollectionReference, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../db';

export const getTasksCollection = (): CollectionReference => {
    return collection(db, 'tasks');
};

export const createTask = async (task: Omit<Task, 'id' | 'isCompleted'>) => {
    const tasksCol = getTasksCollection();
    await addDoc(tasksCol, task);
};

export const updateTask = async (taskId: Task['id'], taskData: Omit<Task, 'id' | 'isCompleted'>) => {
    const docRef = doc(db, 'tasks', taskId);
    await updateDoc(docRef, taskData);
};

export const completeTask = async (taskId: Task['id'], isCompleted: Task['isCompleted']) => {
    const docRef = doc(db, 'tasks', taskId);
    await updateDoc(docRef, { isCompleted });
};

export const deleteTask = async (taskId: Task['id']) => {
    const docRef = doc(db, 'tasks', taskId);
    await deleteDoc(docRef);
};
