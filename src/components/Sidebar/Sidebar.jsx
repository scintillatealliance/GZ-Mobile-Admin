import { LibraryBig, User } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../../assets/GZLogo.png";

const Sidebar = () => {
    const location = useLocation();
    return (
        <div className='w-56 h-full bg-white border-r border-gray-400 p-4'>
            <div className='w-full flex flex-col justify-center items-center gap-2'>
            <img src={logo} className='w-12 h-12' />
            <h1 className='text-black font-bold text-center text-xl tracking-wide'>Ground Zero</h1>
            </div>
            <div className='w-full h-full mt-8'>
                <ul className='w-full flex flex-col justify-start items-center gap-4'>
                    <NavItem to="/" icon={<User size={20} />} label="User" currentPath={location.pathname} />
                    <NavItem to="/booth" icon={<LibraryBig size={20} />} label="Booths" currentPath={location.pathname} />
                </ul>

            </div>

        </div>
    )
}

const NavItem = ({ to, icon, label, currentPath }) => {
    const isActive = to === currentPath;

    return (
        <li className={`w-full p-2 rounded-md ${isActive ? 'bg-blue-600 text-white' : 'bg-white text-black hover:bg-blue-700 hover:text-white'}`}>
            <Link to={to} className='flex flex-row justify-center items-center gap-2'>
                {icon}
                {label}
            </Link>
        </li>
    );
};

export default Sidebar
