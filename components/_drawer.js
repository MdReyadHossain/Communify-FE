import React, { Children } from 'react'
import SwitchTheme from './_switchTheme'
import Link from "next/link";
import { FaUserFriends, FaUserPlus } from "react-icons/fa";

const Drawer = ({ children }) => {
    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content -z-10 p-10 bg-slate-100">
                {children}
            </div>
            <div className="drawer-side drawer-open">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li><Link href={"userList"} class="mr-12 hover:text-indigo-600"><FaUserFriends className='text-xl' /> All Users</Link></li>
                    <li><Link href={"friends"} class="mr-12 hover:text-indigo-600"><FaUserPlus className='text-xl' /> Friends</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Drawer
