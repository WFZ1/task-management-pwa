import { Task } from '@/types';
import mockTasks from '@/components/tasks/data/tasks.json';

export const getTasks = async (): Promise<Task[] | null | undefined> => {
    // const { data, error }: DBQueryResponse<Task[]> = await db.from('tasks').select();

    // if (error) {
    //     throw error;
    // }

    // return data;

    return mockTasks;
};

export const getTask = async (taskId: Task['id']): Promise<Task | null | undefined> => {
    // const { data, error }: DBQueryResponse<Task> = await db.from('tasks').select().eq('id', taskId).single();

    // if (error) {
    //     throw error;
    // }

    // return data;

    return mockTasks[0];
};

export const createTask = async (task: Omit<Task, 'id' | 'isCompleted'>) => {
    // const { error } = await db.from('tasks').insert(task);
    // if (error) {
    //     throw error;
    // }
};

export const updateTask = async (taskId: Task['id'], taskData: Omit<Task, 'id' | 'isCompleted'>) => {
    // const { error } = await db.from('tasks').update(taskData).eq('id', taskId);
    // if (error) {
    //     throw error;
    // }
};

export const completeTask = async (taskId: Task['id'], isCompleted: Task['isCompleted']) => {
    // const { error } = await db.from('tasks').update({ isCompleted }).eq('id', taskId);
    // if (error) {
    //     throw error;
    // }
};

export const deleteTask = async (taskId: Task['id']) => {
    // const { error } = await db.from('tasks').delete().eq('id', taskId);
    // if (error) {
    //     throw error;
    // }
};
