import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TaskForm } from '@/components/task-form/task-form';
import { format } from 'date-fns';
import { Task, TaskFields } from '@/types';
import { DATE_FORMAT } from '@/constants';
import { taskFormSchema } from '@/components/task-form/task-form-schema';
import { createTask, getTasksCollection } from '@/services/tasks';
import { useNavigate } from 'react-router-dom';
import { onSnapshot, query } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';

export const TaskFormControl = () => {
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
                const isTaskCreated = docChanges.length && docChanges[0].type === 'added';

                if (isTaskCreated && isFormSubmitted.current) {
                    navigate('/tasks');
                }

                setIsLoading(false);
            },
            (error) => {
                setError('Failed navigate to tasks page. Please try again later.');
                console.error('Firestore error: ', error);

                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, [navigate]);

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
        return <div>Loading task...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <TaskForm form={form} onSubmit={handleSubmit} />;
};
