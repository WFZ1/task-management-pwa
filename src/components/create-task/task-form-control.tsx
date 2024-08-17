import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TaskForm } from '@/components/task-form/task-form';
import { format } from 'date-fns';
import { Task, TaskFields } from '@/types';
import { DATE_FORMAT } from '@/constants';
import { taskFormSchema } from '@/components/task-form/task-form-schema';
import { createTask } from '@/services/tasks';
import { useNavigate } from 'react-router-dom';
import { useCallback, useRef } from 'react';
import { useTasksSnapshot } from '@/hooks/useTasksSnapshot';
import { QuerySnapshot } from 'firebase/firestore';

export const TaskFormControl = () => {
    const isFormSubmitted = useRef(false);
    const navigate = useNavigate();

    const handleTasksSnapshot = useCallback(
        (snapshot: QuerySnapshot) => {
            const docChanges = snapshot.docChanges();
            const isTaskCreated = docChanges.length && docChanges[0].type === 'added';

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
            title: '',
            description: '',
        },
    });

    const handleSubmit = async (values: TaskFields & Pick<Task, 'isCompleted'>) => {
        isFormSubmitted.current = true;

        const formattedValues = {
            ...values,
            deadline: format(values.deadline, DATE_FORMAT),
            isCompleted: false,
        };

        try {
            createTask(formattedValues);
        } catch (error) {
            console.error('Error inserting task to db: ', error);
        }
    };

    if (isLoading) {
        return <div>Creating task...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <TaskForm form={form} onSubmit={handleSubmit} />;
};
