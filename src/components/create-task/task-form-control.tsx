import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TaskForm } from '@/components/task-form/task-form';
import { format } from 'date-fns';
import { Task, TaskFields } from '@/types';
import { DATE_FORMAT } from '@/constants';
import { taskFormSchema } from '@/components/task-form/task-form-schema';
import { createTask } from '@/services/tasks';
import { useNavigate } from 'react-router-dom';

export const TaskFormControl = () => {
    const navigate = useNavigate();

    const form = useForm<TaskFields>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: {
            title: '',
            description: '',
        },
    });

    const handleSubmit = async (values: TaskFields & Pick<Task, 'isCompleted'>) => {
        const formattedValues = {
            ...values,
            deadline: format(values.deadline, DATE_FORMAT),
            isCompleted: false,
        };

        try {
            await createTask(formattedValues);
            navigate('/tasks');
        } catch (error) {
            console.error('Error inserting task to db: ', error);
        }
    };

    return <TaskForm form={form} onSubmit={handleSubmit} />;
};
