import { TasksTable } from '@/components/tasks-table/tasks-table';
import { getTasksCollection } from '@/services/tasks';
import { Task as ITask } from '@/types';
import { onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const Tasks = () => {
    const [tasks, setTasks] = useState<ITask[] | null | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const q = query(getTasksCollection());
        const unsubscribe = onSnapshot(
            q,
            (querySnapshot) => {
                setIsLoading(true);
                setError(null);

                try {
                    const todos = querySnapshot.docs.map((doc) => ({
                        ...(doc.data() as Omit<ITask, 'id'>),
                        id: doc.id,
                    }));

                    setTasks(todos);
                } catch (e) {
                    setError(e instanceof Error ? e.message : 'An unknown error occurred');
                    console.error('Error fetching tasks: ', e);
                } finally {
                    setIsLoading(false);
                }
            },
            (error) => {
                setError('Failed to fetch tasks. Please try again later.');
                console.error('Firestore error: ', error);

                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    if (isLoading) {
        return <div>Loading tasks...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <TasksTable data={tasks ?? []} />;
};
