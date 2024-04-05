// @ts-ignore
import React, {useEffect, useState} from "react";
import {GiHamburgerMenu} from "react-icons/gi";
// import {Button} from "@mui/material";
import {CiShoppingCart} from "react-icons/ci";
import { Link } from "react-router-dom";




function Header(): JSX.Element {
    let Links = [
        {name: "HOME", link: "/"},
        {name: "PRODUCTS", link: "/products"},
        {name: "ABOUT", link: "/about"},
        {name: "STORE", link: "/store"},
        {name: "CONTACT", link: "/contact"},
    ];
    let [open, setOpen] = useState(false);
    const closeMenu = () => {
        setOpen(false);
    };
    //@ts-ignore
    //@ts-ignore
    return (
        <header className={'z-20'}>

            <nav className="mb-28">
                <div className='shadow-md w-full fixed top-0 left-0'>
                    <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
                        <div
                            className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins]text-gray-800'>
                            <span className='text-3xl text-indigo-600 mr-1 pt-2'>
        {/*<ion-icon name="logo-ionic"></ion-icon>*/}
                                {/*    <GiHamburgerMenu />*/}

        </span>
                            LOGO
                        </div>

                        <div onClick={() => setOpen(!open)}
                             className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
                            {/*<ion-icon name={open ? 'close':'menu'}></ion-icon>*/}
                            <GiHamburgerMenu name={open ? 'close' : 'menu'}/>
                        </div>

                        <ul onClick={close} className={`md:flex md:items-center md:pb-0 pb-5 absolute md:static bg-white md:z-auto z-[10] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-24 ' : 'top-[-490px]'} `}>
                            {
                                Links.map((link) => (
                                    <li key={link.name} className='md:ml-8 text-xl md:my-0 my-1' >
                                        <Link  to={link.link} className={'text-gray-800 hover:text-gray-400 duration-500 font-bold'}  onClick={closeMenu} >{link.name}</Link>


                                        {/*<a href={link.link}*/}
                                        {/*   className='text-gray-800 hover:text-gray-400 duration-500 font-bold'>{link.name}</a>*/}
                                    </li>
                                ))
                            }
                        </ul>
                        <div className={''}>
                            <button className={'hover:bg-fuchsia-400 rounded-full border-2 border-b px-1 pt-1 h-10'}>
                                <CiShoppingCart size={'20'} className={' focus:bg-amber-300'}/>
                                <div className={'rounded-full bg-red-700 flex align-middle px-2 h-fit w-fit'} style={{color:"white",position:"relative",left:"15px" ,top:"-1px"
                                }}>
                                    2
                                </div>
                            </button>

                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
        ;
}

export default Header;