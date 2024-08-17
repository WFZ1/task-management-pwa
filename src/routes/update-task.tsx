import { Task } from '@/components/edit-task/task';
import { Header } from '@/components/header/header';
import { useSearchParams } from 'react-router-dom';

export default function UpdateTaskPage() {
    const [searchParams] = useSearchParams();

    return (
        <>
            <Header />
            <Task id={searchParams.get('id')} />
        </>
    );
}
