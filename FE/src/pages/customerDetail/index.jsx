import React, { useEffect, useState } from 'react';
import "./index.scss";
import maleImg from "../../assets/images/male.png";
import feMaleImg from "../../assets/images/female.jpg"
import {  useNavigate, useParams } from 'react-router-dom';
import { upperCaseFirstLetter } from '../../utils/helpers';
import useFetchData from '../../hooks/useFetchData';

function CustomerDetail(props) {
    const {id} = useParams();
    const {data} = useFetchData(`customers/${id}`);
    return (
        <div className='customer_detail'>
            {data?.gender === "male" ? 
                <img src={maleImg} alt='maleImg'  /> : 
                <img src={feMaleImg} alt='feMaleImg'  />  
            }
            <h4 className='mb-3'>
                {data?.firstName && data?.lastName && (upperCaseFirstLetter(data?.firstName) + ' '+ upperCaseFirstLetter(data?.lastName))}
            </h4>
            <p className='mb-1'>{data?.address}</p>
            <p className='d-flex mb-5'>
                <span>{data?.city} ,</span>
                <span>{data?.state && (data?.state).name}</span>
            </p>
        </div>
    );
}

export default CustomerDetail;