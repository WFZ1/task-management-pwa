import { TasksTable } from '@/components/tasks-table/tasks-table';
import { useTasksSnapshot } from '@/hooks/useTasksSnapshot';
import { Task as ITask } from '@/types';
import { QuerySnapshot } from 'firebase/firestore';
import { useCallback, useState } from 'react';

export const Tasks = () => {
    const [tasks, setTasks] = useState<ITask[] | null | undefined>();

    const handleTasksSnapshot = useCallback((snapshot: QuerySnapshot) => {
        const todos = snapshot.docs.map((doc) => ({
            ...(doc.data() as Omit<ITask, 'id'>),
            id: doc.id,
        }));

        setTasks(todos);
    }, []);

    const { isLoading, error } = useTasksSnapshot({
        onNext: handleTasksSnapshot,
    });

    if (isLoading) {
        return <div>Loading tasks...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <TasksTable data={tasks ?? []} />;
};
