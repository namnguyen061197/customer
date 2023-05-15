import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { BiLogIn } from 'react-icons/bi';
import axiosClient from '../../api/axiosClient';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const navigate= useNavigate();
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email("Must be email syntax"),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });

    return (
        <div className='login'>
            <h3><BiLogIn /> Login </h3>
            <Formik
                initialValues={{email:"",password:""}}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    const authLogin = async () => {
                        const res = await axiosClient.post("auth/login", {...values});
                        if(res) {
                            localStorage.setItem("user", JSON.stringify(res));
                            navigate("../")
                        }
                    }
                    authLogin()
                    
                }}
            >
                {({ isSubmitting, isValid, values }) => (
                    <Form className='form'>
                        <div className='mb-2'>
                            <label htmlFor="email">Email:</label>
                            <Field className="form-control" type="email" id="email" name="email" />
                            <ErrorMessage className='err_mes' name="email" component="div" />
                        </div>
                
                        <div className='mb-2'>
                            <label htmlFor="password">Password:</label>
                            <Field className="form-control" type="text" id="password"  name="password" />
                            <ErrorMessage className='err_mes' name="password" component="div" />
                        </div>
                        
                        <div className="action_btn my-3 d-flex justify-content-start">      
                            <button type="submit" disabled={!isValid} className="btn btn-success">Login</button>
                        </div>
                    </Form>
                )}
            </Formik> 
        </div>
    );
}

export default Login;