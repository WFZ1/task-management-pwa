import { Header as TasksHeader } from '@/components/tasks/header';
import { Tasks } from '@/components/tasks/tasks';
import { Header } from '@/components/header/header';

export default function TasksPage() {
    return (
        <>
            <Header />
            <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
                <TasksHeader />
                <Tasks />
            </div>
        </>
    );
}
