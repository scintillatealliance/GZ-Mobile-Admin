import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';

const Layout = () => {
    return (
        <div className='w-full h-full flex justify-start items-start bg-white text-neutral-950'>
            <Sidebar />
            <div className='w-full h-full flex justify-start items-start bg-slate-200 p-4'>
            <Outlet />
            </div>
        </div>
    )
}

export default Layout
