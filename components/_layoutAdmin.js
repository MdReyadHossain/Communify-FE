import Header from "./_header";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { Children, useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from 'react';
import SwitchTheme from "./_switchTheme";
import { AiFillDashboard, AiOutlineUser } from "react-icons/ai";
import FooterAdmin from "./_footerAdmin";

export default function LayoutAdmin({ children }) {
    const router = useRouter();
    const [image, setImage] = useState('');
    useEffect(() => {
        setImage(sessionStorage.getItem('image'));
    });

    return (
        <>
            <Header title="Communify" />

            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle " />
                <div className="drawer-content">
                    <div className="lg:sticky lg:top-0 navbar z-10">
                        <div className="flex-1">
                            <label htmlFor="my-drawer-2" className="btn btn-circle swap swap-rotate drawer-button lg:hidden bg-white border-none">
                                <input type="checkbox" />
                                <svg className="swap-off fill-current text-gray-800" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
                                <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
                            </label>
                        </div>
                        <div className="flex-none gap-2">
                            <div className="form-control">
                                <input type="text" placeholder="Search" className="bg-slate-50 input w-32 lg:w-60" />
                            </div>
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        {/* <img src={"http://localhost:3000/admin/getimage/" + image} alt="admin" /> */}
                                    </div>
                                </label>
                                <ul tabIndex={0} className="mt-3 p-2 drop-shadow-lg menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                        </a>
                                    </li>
                                    <li><a>Settings</a></li>
                                    <li><a href="/logout">Logout</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex-none gap-2"><SwitchTheme /></div>
                    </div>
                    <div className={""}>
                        {children}
                    </div>
                    <div className="h-screen"></div>
                    <FooterAdmin />
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu w-60 bg-slate-950 text-slate-200">
                        <li className="text-2xl text-white font-bold m-2">Admin Panal</li>
                        <br />
                        {/* <!-- Sidebar content here --> */}
                        <li className={router.pathname.indexOf("/admin/dashboard") !== -1
                            ? "bg-indigo-700 hover:bg-slate-800"
                            : "hover:bg-slate-800"}>
                            <Link href={"/admin/dashboard"}><AiFillDashboard className="" />Dashboard</Link>
                        </li>
                        <li className={router.pathname.indexOf("/admin/user") !== -1
                            ? "bg-indigo-700 hover:bg-slate-800"
                            : "hover:bg-slate-800"}>
                            <Link href={"/admin/user"}><AiOutlineUser className="" />Users</Link>
                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
}