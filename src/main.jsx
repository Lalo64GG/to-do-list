import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './index.css'
import { Login } from './Login';
import { Task } from './Task';
import TodoList from './todolist';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path:"/task",
    element: <TodoList/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
