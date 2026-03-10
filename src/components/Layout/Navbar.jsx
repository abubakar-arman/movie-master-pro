"use client"
import { useEffect, useState } from 'react';
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import logger from '@/lib/logger';
import NavLink from './NavLink';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from './Logo';

const Navbar = () => {
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") return "light";
        return localStorage.getItem("theme") || "light";
    });
    const router = useRouter()
    const session = useSession()
    // logger.debug(user);
    useEffect(() => {
        if (typeof window === "undefined") return;
        const html = document.querySelector("html");
        html?.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const isAuthenticated = session?.status === 'authenticated'
    const user = session?.data?.user

    // const links = [
    //     { title: 'Home', url: '/' },
    //     { title: 'Movies', url: '/movies' },
    //     { title: 'Add Movie', url: '/add-movie'},
    //     { title: 'Login', url: '/login' },
    //     { title: 'Register', url: '/register' },
    // ]

    const navLinks = <>
        <li key={1}>
            <NavLink href='/' >Home</NavLink>
        </li>
        <li key={2}>
            <NavLink href='/movies' >Movies</NavLink>
        </li>
        {isAuthenticated ?
            <>
                <li key={4}>
                    <NavLink href='/add-movie'>Add Movie</NavLink>
                </li>
                <li key={44}>
                    <NavLink href='/my-collection'>My Collection</NavLink>
                </li>
                <li key={45}>
                    <NavLink href='/watchlist'>Watchlist</NavLink>
                </li>
            </>
            :
            <>
                <li key={3}>
                    <NavLink href='/login'>Login</NavLink>
                </li>
                <li key={4}>
                    <NavLink href='/signup'>Register</NavLink>
                </li>
            </>}
    </>

    const handleLogout = async () => {
        const result = await signOut()
        router.push("/")
    }

    const handleTheme = checked => {
        const theme = checked ? 'dark' : 'light'
        setTheme(theme)
    }

    return (
        <div className="navbar bg-base-100 shadow-sm lg:px-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-2 mt-3 w-52 p-2 shadow font-bold">
                        {navLinks}

                    </ul>
                </div>
                <Link href='/' className="flex items-center font-extrabold text-primary">
                    <Logo />
                    <p>MovieMaster Pro</p>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-bold">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">

                {isAuthenticated &&
                    <div className="dropdown">

                        <div tabIndex={0} role='button' className="avatar mr-4">
                            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                                <Image width={150} height={150} alt='Avatar' src={user.image} />
                            </div>
                        </div>
                        <div
                            tabIndex={0}
                            className="dropdown-content card card-sm bg-base-100 z-100 w-64 shadow-md right-0">
                            <div className="card-body">
                                <p className='font-semibold text-xl'>{user.name}</p>
                                <p>Email : {user.email}</p>
                                <button onClick={handleLogout} className="btn bg-red-700 text-base-100">Logout</button>
                            </div>
                        </div>
                    </div>
                }
                <div className="theme flex items-center gap-2">
                    <MdLightMode /><input onChange={(e) => handleTheme(e.target.checked)}
                        checked={theme === 'dark' ? 'checked' : ''} type="checkbox" className="toggle" /><MdDarkMode />
                </div>
            </div>
        </div>
    );
};

export default Navbar;