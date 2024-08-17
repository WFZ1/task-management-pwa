import { getTasksCollection } from '@/services/tasks';
import { TaskFormControl } from './task-form-control';
import { useEffect, useState } from 'react';
import { Task as ITask } from '@/types';
import { onSnapshot, query } from 'firebase/firestore';

interface TaskProps {
    id: string | null;
}

export const Task = ({ id }: TaskProps) => {
    const [task, setTask] = useState<ITask | null | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const q = query(getTasksCollection());
        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                setIsLoading(true);
                setError(null);

                const doc = snapshot.docs.find((doc) => doc.id === id);

                if (!doc) {
                    setTask(undefined);
                    return;
                }

                const todo = {
                    ...(doc.data() as Omit<ITask, 'id'>),
                    id: doc.id,
                };

                setTask(todo);
                setIsLoading(false);
            },
            (error) => {
                setError('Failed to fetch task. Please try again later.');
                console.error('Firestore error: ', error);

                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, [id]);

    if (!id) {
        return <div>Task id was not provided</div>;
    }

    if (isLoading) {
        return <div>Loading tasks...</div>;
    }

    if (!task) {
        return <div>Task not found</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <TaskFormControl task={task} />;
};
