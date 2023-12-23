import { createBrowserRouter } from "react-router-dom";
import Layout from "../Mainlayout/Layout";
import Error from "../Pages/ErrorPage/Error";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Dashboard/Dashboard";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Task from "../Dashboard/Task/Task";
import CreateTask from "../Dashboard/CreateTask/CreateTask";
  
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      errorElement:<Error></Error>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'register',
            element:<Register></Register>
        },
        {
            path:'footer',
            element: <Register></Register>
        },
        
      ]
    },
    {
      path:'dashboard',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      errorElement:<Error></Error>,
      children:[
        {
          path:'task',
          element:<Task></Task>,
          loader:()=>fetch('http://localhost:5000/tasksCollection')
        },
        {
          path:'task/createTask',
          element:<CreateTask></CreateTask>
        }
      ]
    }
  ]);
export default Router;