import React, { useState } from 'react';
import "./index.scss"
import useFetchData from '../../hooks/useFetchData';
import { useParams } from 'react-router-dom';
import { totalCostOrder, upperCaseFirstLetter } from '../../utils/helpers';

function OrderDetail(props) {
    const {id} = useParams();
    const {data} = useFetchData(`customers/${id}`);

    return (
        <div className='order_detail mt-3 '>
            <h4>Order for {data?.firstName && data?.lastName && (upperCaseFirstLetter(data?.firstName) + ' '+ upperCaseFirstLetter(data?.lastName))} </h4>
            <div className='list_order mt-5'>
                {
                    data?.orders.map((ord, idx) => 
                        <div key={idx} className='d-flex justify-content-between mb-1'>
                            <span>{ord?.productName}</span>
                            <span>{ord?.itemCost}$</span>
                        </div>
                    )
                }
                <hr className='my-1'/>
                <div className='total d-flex justify-content-end'>
                    <span>{data?.orders && totalCostOrder(data?.orders)}</span>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;