import './Register.css';

import hondaImg from '../honda.png'
import React from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { history } from '../../history'
import { NavLink } from "react-router-dom"


import {ErrorMessage, Formik, Form, Field} from 'formik'


const Register = () => {
    const handleSubmit = values => {
        axios.post('http://localhost:8080/requester/send', values)
        .then(resp =>{
            const { data } = resp
            if(data){
                localStorage.setItem('app-token',data)
                console.log(data)
                history.push('/')
            }
        }

        )
    }

    const validations = yup.object().shape({
        companyName: yup.string().required(),
        cnpj: yup.string().required(),
        address: yup.string().required(),
        phone: yup.string().required(),
        password: yup.string().required()
    })

    return (
        <div className="Register">
            <Formik initialValues={{}} onSubmit={handleSubmit} validationSchema={validations}>
                
                    <div className="container">
                        <Form className="form">
                            <a href=""><img src={hondaImg} alt="Logo nexus"/></a>
                                <div className="Form-Group">
                                    <Field
                                        name = "companyName"
                                        id = "iName"
                                        className = "Form-Field"
                                        placeholder="Razão Social: ex: Nexoos "
                                    />
                                    <ErrorMessage
                                        component="span"
                                        name = "companyName"
                                        id = "NameError"
                                        className = "Form-Error"
                                    />
                                </div>
                                <div className="Form-Group">
                                <Field
                                    name = "cnpj"
                                    id = "iSName"
                                    className = "Form-Field"
                                    placeholder="CNPJ: ex:  XX. XXX. XXX/0001-XX"
                                />
                                <ErrorMessage
                                    component="span"
                                    name = "cnpj"
                                    id = "SNameError"
                                    className = "Form-Error"
                                />
                                </div>
                               <div className="Form-Group">
                               <Field
                                    name = "address"
                                    id = "iSName"
                                    className = "Form-Field"
                                    placeholder="Endereço"
                                    className = "Form-Error"
                                />
                                <ErrorMessage
                                    component="span"
                                    name = "address"
                                    id = "SNameError"
                                    className = "Form-Error"
                                />
                                </div>
                                <div className="Form-Group">
                                <Field
                                    name = "phone"
                                    id = "iTel"
                                    className = "Form-Field"
                                    placeholder="Telefone: ex: 61 - 91733211"
                                />
                                <ErrorMessage
                                    component="span"
                                    name = "phone"
                                    id = "TelError"
                                    className = "Form-Error"
                                />
                                </div>                                
                                <div className="Form-Group">
                                <Field
                                    name = "password"
                                    id = "iTel"
                                    className = "Form-Field"
                                    placeholder="password"
                                />
                                <ErrorMessage
                                    component="span"
                                    name = "password"
                                    id = "TelError"
                                    className = "Form-Error"
                                />
                                </div>        
                
                                <button id="btnSend" type="submit">Sign up</button>
                                <NavLink exact activeClassName="active" to="/login"> <button id="btnSend" type="">sign in</button> </NavLink>
                                <br/>
                        </Form>
                    </div>        

            </Formik>
        </div>
    );
}

export default Register;
