import { Task } from '@/types';
import {
    addDoc,
    collection,
    CollectionReference,
    deleteDoc,
    doc,
    DocumentData,
    getDoc,
    updateDoc,
} from 'firebase/firestore';
import { db } from '../db';

export const getTasksCollection = (): CollectionReference<DocumentData, DocumentData> => {
    return collection(db, 'tasks');
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
