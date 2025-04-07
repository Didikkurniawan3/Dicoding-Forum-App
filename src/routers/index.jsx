import { createBrowserRouter } from 'react-router-dom'
import { Fallback } from '../components/fallback/Fallback'
import { AppLayout } from '../components/layouts/AppLayout'
import { AuthLayout } from '../components/layouts/AuthLayout'
import LoginPage from '../pages/auth/Login'
import RegisterPage from '../pages/auth/Register'
import HomePage from '../pages/Dashboard'
import LeaderboardPage from '../pages/Leaderboard'
import ThreadDetailPage from '../pages/Thread-Detail'


export const routers = createBrowserRouter([
    {
        path: '/',
        errorElement: <Fallback body='Something went wrong' title=".·°՞(≧□≦)՞°·." />,
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "thread/:id",
                element: <ThreadDetailPage />,
            },
            {
                path: "leaderboard",
                element: <LeaderboardPage />,
            },
        ],
    },
    {
        path: '/',
        errorElement: <Fallback body='Something went wrong' title=".·°՞(≧□≦)՞°·." />,
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
        ],
    },
    {
        path: '*',
        element: <Fallback body='Page not found.' title="404" />,
    },
])
