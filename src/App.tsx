import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTaskPage from './routes/create-task.tsx';
import ErrorPage from './routes/error.tsx';
import HomePage from './routes/home.tsx';
import TasksPage from './routes/tasks.tsx';
import UpdateTaskPage from './routes/update-task.tsx';

const router = createBrowserRouter([
    {
        errorElement: <ErrorPage />,
    },
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/create-task',
        element: <CreateTaskPage />,
    },
    {
        path: '/edit-task',
        element: <UpdateTaskPage />,
    },
    {
        path: '/tasks',
        element: <TasksPage />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
