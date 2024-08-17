import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TaskForm } from '@/components/task-form/task-form';
import { format } from 'date-fns';
import { Task, TaskFields } from '@/types';
import { DATE_FORMAT } from '@/constants';
import { taskFormSchema } from '@/components/task-form/task-form-schema';
import { updateTask } from '@/services/tasks';
import { useNavigate } from 'react-router-dom';
import { useCallback, useRef } from 'react';
import { QuerySnapshot } from 'firebase/firestore';
import { useTasksSnapshot } from '@/hooks/useTasksSnapshot';

interface TaskFormControlProps {
    task: Task;
}

export const TaskFormControl = ({ task }: TaskFormControlProps) => {
    const isFormSubmitted = useRef(false);
    const navigate = useNavigate();

    const handleTasksSnapshot = useCallback(
        (snapshot: QuerySnapshot) => {
            const docChanges = snapshot.docChanges();
            const isTaskCreated = docChanges.length && docChanges[0].type === 'modified';

            if (isTaskCreated && isFormSubmitted.current) {
                navigate('/tasks');
            }

            isFormSubmitted.current = false;
        },
        [navigate]
    );

    const handleTasksSnapshotError = useCallback(() => (isFormSubmitted.current = false), []);

    const { isLoading, error } = useTasksSnapshot({
        onNext: handleTasksSnapshot,
        onError: handleTasksSnapshotError,
    });

    const form = useForm<TaskFields>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: {
            title: task.title,
            description: task.description,
            deadline: new Date(task.deadline),
            priority: task.priority,
        },
    });

    const handleSubmit = async (values: TaskFields) => {
        isFormSubmitted.current = true;

        const formattedValues = {
            ...values,
            deadline: format(values.deadline, DATE_FORMAT),
        };

        try {
            updateTask(task.id, formattedValues);
        } catch (error) {
            console.error('Error updating task: ', error);
        }
    };

    if (isLoading) {
        return <div>Updating task...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <TaskForm form={form} onSubmit={handleSubmit} />;
};
