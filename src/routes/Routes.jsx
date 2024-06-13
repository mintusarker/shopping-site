import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import UserDashboard from "../component/dashboard/UserDashboard";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: '/',
                element: <UserDashboard></UserDashboard>
            }
        ]
    }
])


export default router;