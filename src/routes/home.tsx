import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <Link to="/create-task">Create Task</Link>
            <Link to="/tasks">Tasks</Link>
        </main>
    );
}
