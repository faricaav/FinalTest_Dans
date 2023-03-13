import { useState, useEffect } from "react";
import { Link, useRoutes } from "react-router-dom";
import { logout } from "../features/authSlice";
import { useDispatch } from "react-redux";
import "../styles/dashboard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cookies from 'js-cookie';
import axios from "axios";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const [menu, setMenu] = useState([]);
    const dispatch = useDispatch()
    const name = Cookies.get('name');
    let token = Cookies.get('token');

    const out = () => {
            dispatch(logout())
            window.location = '/'
    }

    const getMenu = () => {
        axios.get("http://localhost:8080/menu/karyawan", {
          headers: {
            Authorization: `Bearer ${token}`,
          }})
        .then((response) => {
          const dataRes = response.data
          console.log(dataRes)
          setMenu(dataRes)
        })
    }

    useEffect(() => {
        getMenu()
    }, []);

    return (
        <div className="flex">
            <div
                className={` ${
                open ? "w-72" : "w-20 "
                } bg-blue min-h-screen p-5  pt-8 relative duration-300`} style={{bottom: 0}}>
                    <img
                    src="https://cdn-icons-png.flaticon.com/512/992/992534.png"
                    className={`absolute cursor-pointer -right-3 top-12 w-7 border-blue
                    border-blue ${!open && "rotate-90"}`}
                    onClick={() => setOpen(!open)}
                    />
                <div className="flex gap-x-4 items-center">
                <figure className={`shadow-md ${
                    !open && "scale-0"
                    }`}>{name.charAt(0).toUpperCase()}
                </figure>
                <h1
                    className={`text-white origin-left font-medium text-xl duration-200 mt-2 ${
                    !open && "scale-0"
                    }`}
                >
                    {name}
                </h1>
                </div>
                <div className="pt-5">
                {menu.map((item, index) => {
                        return (
                <ul>
                    <li className="flex  rounded-md p-2 cursor-pointer text-white text-sm items-center gap-x-5">
                    <div className={`${!open && "mx-n3 mt-2"} text-xl`} ><Link to={item.path}><FontAwesomeIcon icon={item.icon}/></Link></div>
                            <Link to={item.path} onClick={() => {if(item.name === "Logout"){out()}}}className="nav-link" >
                            <span className={`${!open && "hidden gap-x-4"} origin-left duration-200 text-white`}>
                                {item.name} 
                            </span>
                            </Link>
                    </li>
                </ul>
                )})}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;