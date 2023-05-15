import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import "./index.scss"
import axiosClient from '../../api/axiosClient';

function Layout() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user")) ;

    const hanldeLogout = async () => {
        const res = await axiosClient.post("auth/logout");
        if(res){
            localStorage.removeItem("user");
            navigate("/")
        }
    }

    return (
        <div className='layout'>
            <div className='header px-3 py-2'>
                <div className="container d-flex justify-content-between align-item-center">
                    <div className="left d-flex">
                        <div className="logo me-5">
                            <h4>Customer Manager</h4>
                        </div>
                        <ul className='d-flex mb-0 pt-1'>
                            <NavLink to="/customer" className="mx-3">
                                Customers
                            </NavLink>
                            <NavLink to="/setting" className="mx-3"> 
                                Settings
                            </NavLink>
                        </ul>
                    </div>
                    {
                        !user ? 
                        <div className="right pt-1" onClick={() => navigate("login")}>
                            Login
                        </div> : 
                        <p>
                            <span>{user.email}</span>
                            <span className='logout' onClick={() => hanldeLogout()}> (Logout)</span>
                        </p>
                    }
                </div>
            </div>
            <div className='container py-3'>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;