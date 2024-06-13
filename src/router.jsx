import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Stuff from "./pages/Stuff/Index";
import StuffCreate from "./pages/Stuff/Create";
import StuffEdit from "./pages/Stuff/Edit";
import StuffTrash from "./pages/Stuff/Trash";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User/Index";
import UserCreate from "./pages/User/Create";
import UserEdit from "./pages/User/Edit";
import UserTrash from "./pages/User/Trash";
import Lending from "./pages/Lending/Index";
import LendingCreate from "./pages/Lending/Create"; 
import LendingTrash from "./pages/Lending/Trash"; 
import LendingEdit from "./pages/Lending/Edit";
import Inbound from "./pages/Inbound/Index";
import InboundCreate from "./pages/Inbound/Create";


export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/stuff', element: <Stuff /> },
    { path: '/stuff/create', element: <StuffCreate /> },
    { path: '/stuff/edit/:id', element: <StuffEdit /> }, 
    { path: '/stuff/trash', element: <StuffTrash /> }, 
    { path: '/lending', element: <Lending /> },
    { path: '/lending/create', element: <LendingCreate /> },
    { path: '/lending/edit/:id', element: <LendingEdit /> },
    { path: '/lending/trash', element: <LendingTrash /> },
    { path: '/user', element: <User /> },
    { path: '/user/create', element: <UserCreate /> },
    { path: '/user/edit/:id', element: <UserEdit /> },
    { path: '/user/trash', element: <UserTrash /> },
    { path: '/inbound', element: <Inbound /> },
    { path: '/inbound/create', element: <InboundCreate /> },

  
])