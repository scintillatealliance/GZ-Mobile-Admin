import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';

const Layout = () => {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        // Check if user is not logged in and redirect to login page
        if (!token) {
            navigate('/login');
        }
    }, []);

    console.log(location);

    return (
        <div className='w-full h-full flex justify-start items-start bg-white text-neutral-950'>
            {
                location.pathname !== '/login' &&  <Sidebar />
            }
            <div className={`w-full h-full flex justify-start items-start ${location.pathname !== '/login' ? 'bg-slate-200 p-4' : 'bg-white text-black' } `}>
            <Outlet />
            </div>
        </div>
    )
}

export default Layout
