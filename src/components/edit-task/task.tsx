import { TaskFormControl } from './task-form-control';
import { useCallback, useState } from 'react';
import { Task as ITask } from '@/types';
import { QuerySnapshot } from 'firebase/firestore';
import { useTasksSnapshot } from '@/hooks/useTasksSnapshot';

interface TaskProps {
    id: string | null;
}

export const Task = ({ id }: TaskProps) => {
    const [task, setTask] = useState<ITask | null | undefined>(null);

    const handleTasksSnapshot = useCallback(
        (snapshot: QuerySnapshot) => {
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
        },
        [id]
    );

    const { isLoading, error } = useTasksSnapshot({
        onNext: handleTasksSnapshot,
    });

    if (!id) {
        return <div>Task id was not provided</div>;
    }

    if (isLoading || task === null) {
        return <div>Loading task...</div>;
    }

    if (!task) {
        return <div>Task not found</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <TaskFormControl task={task} />;
};
