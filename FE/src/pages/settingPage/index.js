import { ErrorMessage,Form, Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import {useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AiFillSetting } from 'react-icons/ai';
import { toast } from 'react-toastify';

function SettingPage(props) {
    const navigate= useNavigate();
    const validationSchema = Yup.object().shape({
        currentEmail: Yup.string().required('Email is required').email("Must be email syntax"),
        newEmail: Yup.string().required('Email is required').email("Must be email syntax"),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(!user?.token){
            navigate("/login");
            return;
        }
    },[navigate])

    return (
        <div className='setting'>

            <h3 className='mb-3'> <AiFillSetting className='me-2 mb-1' />Setting</h3>
            <Formik
                initialValues={{currentEmail: '', newEmail:'', password: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    const res = await axiosClient.post("users", {...values});
                    if(res){
                        localStorage.setItem("user", JSON.stringify(res));
                        toast.success("update user info success !", 300);
                        navigate("/")
                    }

                }}
            >
                {({ isSubmitting, isValid, dirty, values }) => (
                    <Form className='form'>
                        <div className='mb-2'>
                            <label htmlFor="currentEmail">Current Email</label>
                            <Field className="form-control" type="email" id="currentEmail" name="currentEmail" />
                            <ErrorMessage className='err_mes' name="currentEmail" component="div" />
                        </div>
                
                        <div className='mb-2'>
                            <label htmlFor="newEmail">New Email</label>
                            <Field className="form-control" type="email" id="newEmail"  name="newEmail" />
                            <ErrorMessage className='err_mes' name="newEmail" component="div" />
                        </div>

                        <div className='mb-2'>
                            <label htmlFor="password">Confirm password</label>
                            <Field className="form-control" type="text" id="password" name="password" />
                            <ErrorMessage className='err_mes' name="password" component="div" />
                        </div>
                        
                        <div className="action_btn my-3 d-flex justify-content-start">      
                            <button type="submit" disabled={!isValid} className="btn btn-success me-2">Save</button>
                            <button type="button" onClick={() => navigate("../")} className="btn btn-secondary">Cancel</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default SettingPage;