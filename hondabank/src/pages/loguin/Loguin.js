import './Loguin.css';
import hondaImg from '../honda.png'
import React from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { history } from '../../history'
import { format } from 'react-string-format';
import { NavLink } from "react-router-dom"


import {ErrorMessage, Formik, Form, Field} from 'formik'


const Loguin = () => {
    const handleSubmit = values => {
        console.log();
        axios.get(format('http://localhost:8080/requester/gets/{0}/{1}', values['cnpj'], values['password']))
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
        cnpj: yup.string().required(),
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
                
                                <button id="btnSend" type="submit">sign in</button>
                                <br/>
                                <NavLink exact activeClassName="active" to="/login"> <button id="btnSend" type="">sign up</button> </NavLink>
                        </Form>
                    </div>        

            </Formik>
        </div>
    );
}

export default Loguin;
