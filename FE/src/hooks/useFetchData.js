import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

function useFetchData(url) {
    const [data, setData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosClient.get(url);
            setData(res)
        }
        fetchData()
    },[url])
    return {data}
}

export default useFetchData;