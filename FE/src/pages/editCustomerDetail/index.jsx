import React, { useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import axiosClient from '../../api/axiosClient';
import { upperCaseFirstLetter } from '../../utils/helpers';
import { toast } from 'react-toastify';

const EditCustomerDetail = () => {
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        address: Yup.string().required('Address is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required')
    });

    const {id} = useParams();
    const {data} = useFetchData(`customers/${id}`)
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(!user?.token){
            navigate("/login");
            return;
        }
    },[navigate])

    const initialValue = {
        firstName : data ? upperCaseFirstLetter(data.firstName) : "",
        lastName : data ? upperCaseFirstLetter(data.lastName) : "",
        address : data ? data.address : "",
        city : data ? data.city : "",
        state : data ? data.state.name : ""
    }

    const updateCustomer = async (values) => {
        const res = await axiosClient.put(`customers/${id}`, {...values} )
        if(res){
            toast.success("Update success !", {
                autoClose: 500,
                onClose: () => {
                    navigate("/")
                }
            })
        }
    }

    const handleDelete = async () => {
        const res = await axiosClient.delete(`customers/${id}`);
        if(res){
            toast.success("Delete success !", {
                autoClose: 500,
                onClose: () => {
                    navigate("/")
                }
            })
    }   ;

    }

    return (
        <div className='edit_detail'>
            {data ? 
            <Formik
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                // Xử lý logic submit form
                    updateCustomer(values)
                    
                }}
            > 
                <Form className='form'>
                    <div className='mb-2'>
                        <label htmlFor="firstName">First Name:</label>
                        <Field className="form-control" type="text" id="firstName" name="firstName" />
                        <ErrorMessage className='err_mes' name="firstName" component="div" />
                    </div>
            
                    <div className='mb-2'>
                        <label htmlFor="lastName">Last Name:</label>
                        <Field className="form-control" type="text" id="lastName"  name="lastName" />
                        <ErrorMessage className='err_mes' name="lastName" component="div" />
                    </div>
            
                    <div className='mb-2'>
                        <label htmlFor="address">Address:</label>
                        <Field className="form-control" type="text" id="address"name="address" />
                        <ErrorMessage className='err_mes' name="address" component="div" />
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="city">City:</label>
                        <Field className="form-control" type="text" id="city" name="city"  />
                        <ErrorMessage className='err_mes' name="city" component="div" />
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="state">State:</label>
                        <Field className="form-control" type="text" id="state" name="state"  />
                        <ErrorMessage className='err_mes' name="state" component="div" />
                    </div>
                    
                    <div className="action_btn my-3 d-flex justify-content-between">
                        <button type="button" onClick={() => handleDelete()} className="btn btn-danger">Delete</button>
                        <span>
                            <button type="button" className="btn btn-secondary me-2" onClick={() => navigate("../../")}>Cancel</button>
                            <button type="submit" className="btn btn-success">Update</button>
                        </span>
                    </div>
                </Form>
            </Formik> : 
            <p>Loading...</p>
            }
        </div>
    );
  };

export default EditCustomerDetail
  