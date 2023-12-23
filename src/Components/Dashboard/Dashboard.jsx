import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { MdDashboardCustomize } from "react-icons/md";
import { FaHome, FaTasks } from "react-icons/fa";

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className='flex'>
            <div className='w-48 md:w-64 min-h-screen bg-sky-300'>
                <ul className='menu md:p-5 md:text-xl space-y-4'>
                    <div className="">
                        <div className="md:w-28 flex mx-auto rounded-full">
                            <img className=' rounded-full' alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                        </div>
                    </div>
                    <li>

                        <NavLink to="/dashboard">
                            <MdDashboardCustomize></MdDashboardCustomize>
                            Dashboard
                        </NavLink>
                    </li>
                    {/* <li>

                        <NavLink to="profile">
                            <MdDashboardCustomize></MdDashboardCustomize>
                            Profile
                        </NavLink>
                    </li> */}
                    <li>
                        <NavLink to="task">
                            <FaTasks></FaTasks>
                            Task
                        </NavLink>
                    </li>
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            User Home
                        </NavLink>
                    </li>
                </ul>

            </div>
            <div>
                {
                    user?.email && <h1 className='mt-8 ml-2 md:ml-[750px]'>WELCOME, <span className='font-2xl text-teal-700'>{user?.displayName} </span> </h1>
                }
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;