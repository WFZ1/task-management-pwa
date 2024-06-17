import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TaskForm } from '@/components/task-form/task-form';
import { format } from 'date-fns';
import { Task, TaskFields } from '@/types';
import { DATE_FORMAT } from '@/constants';
import { taskFormSchema } from '@/components/task-form/task-form-schema';
import { updateTask } from '@/services/tasks';
import { useNavigate } from 'react-router-dom';

interface TaskFormControlProps {
    task: Task;
}

export const TaskFormControl = ({ task }: TaskFormControlProps) => {
    const navigate = useNavigate();

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
        const formattedValues = {
            ...values,
            deadline: format(values.deadline, DATE_FORMAT),
        };

        try {
            await updateTask(task.id, formattedValues);
            navigate('/tasks');
        } catch (error) {
            console.error('Error updating task: ', error);
        }
    };

    return <TaskForm form={form} onSubmit={handleSubmit} />;
};
