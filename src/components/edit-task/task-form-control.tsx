import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TaskForm } from '@/components/task-form/task-form';
import { format } from 'date-fns';
import { Task, TaskFields } from '@/types';
import { DATE_FORMAT } from '@/constants';
import { taskFormSchema } from '@/components/task-form/task-form-schema';
import { getTasksCollection, updateTask } from '@/services/tasks';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { onSnapshot, query } from 'firebase/firestore';

interface TaskFormControlProps {
    task: Task;
}

export const TaskFormControl = ({ task }: TaskFormControlProps) => {
    const isFormSubmitted = useRef(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const q = query(getTasksCollection());
        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                setIsLoading(true);
                setError(null);

                const docChanges = snapshot.docChanges();
                const isTaskCreated = docChanges.length && docChanges[0].type === 'modified';

                if (isTaskCreated && isFormSubmitted.current) {
                    navigate('/tasks');
                }

                setIsLoading(false);
                isFormSubmitted.current = false;
            },
            (error) => {
                setError('Failed navigate to tasks page. Please try again later.');
                console.error('Firestore error: ', error);

                setIsLoading(false);
                isFormSubmitted.current = false;
            }
        );

        return () => unsubscribe();
    }, [navigate]);

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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <TaskForm form={form} onSubmit={handleSubmit} />;
};
