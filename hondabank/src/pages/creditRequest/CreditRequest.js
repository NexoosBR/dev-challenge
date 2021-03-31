import hondaImg from '../honda.png'
import React from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { history } from '../../history'
import { NavLink } from "react-router-dom"


import {ErrorMessage, Formik, Form, Field} from 'formik'


const CreditRequest = () => {
    const handleSubmit = values => {
        console.log( {"value":values['value'],"token":localStorage.getItem('app-token')})
        axios.post('http://localhost:8080/requester/request/', {"value":values['value'],"token":localStorage.getItem('app-token')})
        .then(resp =>{
            const { data } = resp
            if(data){
                history.push('/')
            }
        }

        )
    }

    const validations = yup.object().shape({
        value: yup.string().required(),
    })

    return (
        <div className="Register">
            <Formik initialValues={{}} onSubmit={handleSubmit} validationSchema={validations}>
                
                    <div className="container">
                        <Form className="form">
                        <NavLink exact activeClassName="active" to="/"><img src={hondaImg} alt="Logo nexus"/></NavLink>
                               
                                <div className="Form-Group">
                                <Field
                                    name = "value"
                                    id = "iSName"
                                    className = "Form-Field"
                                    placeholder="value: 5000"
                                />
                                <ErrorMessage
                                    component="span"
                                    name = "value"
                                    id = "SNameError"
                                    className = "Form-Error"
                                />
                                </div>                           
                                <button id="btnSend" type="submit">Solicitar</button>
                                <br/>
                        </Form>
                    </div>        

            </Formik>
        </div>
    );
}

export default CreditRequest;
