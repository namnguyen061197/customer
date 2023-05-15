import React, { useState } from 'react';
import "./index.scss"
import { BiEdit, BiListUl } from 'react-icons/bi';
import { BsCartCheck, BsFillGridFill, BsList, BsPersonFill } from 'react-icons/bs';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getParamFromLocation } from '../../utils/helpers';
import useFetchData from '../../hooks/useFetchData';

function LayoutDetail(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const {id} = useParams();
    const {data} = useFetchData(`customers/${id}`);
    const [activeTab, setActiveTab] = useState(getParamFromLocation(location.pathname));

    const listTab = [
        {icon:<BiListUl />, name: "Customer Detail", id:"detail"},
        {icon: <BsCartCheck />, name: "Customer Orders", id:"orders"},
        {icon:<BiEdit />, name: "Edit Customer", id:"edit"}
    ]
    return (
        <div className='layout_detail'>
            <h3 className='mb-4'> 
                <BsPersonFill />
                <span className='ms-2'>Customer Information</span>
            </h3>
            <div className='mb-4'>
                {listTab.map((tab,idx) => 
                    <span 
                        className={`me-5 tab ${activeTab === tab.id ? "active" : ""}`} 
                        onClick={() =>  {
                            navigate(`${tab.id}`);
                            setActiveTab(tab.id)
                        }} 
                        key={idx} 
                    >
                        {tab.icon}
                        <span className='mx-1'>
                            {tab.name}
                        </span>
                    </span>
                )}
            </div>
            <Outlet data={data}/>
            <p className='view_all' onClick={() => navigate("../")}>View All Customer</p>
        </div>
    );
}

export default LayoutDetail;