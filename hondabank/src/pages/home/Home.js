import React, { Component } from 'react';
import axios from 'axios';
import './Home.css';
import hondaImg from '../honda.png'
import { NavLink } from "react-router-dom"

class Home extends Component{
    state={
        loans: [],
        credits: [],
        companyName: "",
    }

    async componentDidMount(){

        const requesterResponse = await axios.get(`http://localhost:8080/requester/get/${localStorage.getItem('app-token')}`);
        this.setState({companyName: requesterResponse.data['companyName']});    
        try{
            const loanResponse = await axios.get(`http://localhost:8080/requester/loan/get/${localStorage.getItem('app-token')}`);
            this.setState({loans: loanResponse.data});
        }catch(error){
            this.setState({loans: []});
        }
        try{
            const creditResponse = await axios.get(`http://localhost:8080/requester/request/get/${localStorage.getItem('app-token')}`);
            this.setState({credits: creditResponse.data});
        }catch(error){
            this.setState({credits: []});
        }
    }

    render(){
        const loans = this.state['loans'];
        const companyName = this.state['companyName'];
        const credits = this.state['credits'];
        console.log(loans)

        return(
            <div className = "containerr">
                    <NavLink exact activeClassName="active" to="/"><img src={hondaImg} alt="Logo honda"/></NavLink>
                <div className="header">
                        <h2>Bem-vindo {companyName}</h2>
                </div>                 
                <div className="fields">
                    <div className="creditt">
                        { credits?.length > 0?
                            (<div className="credit">
                                {credits.map ((credit, index)=>
                                    <li key={index}>
                                        <p id="header"> <strong>Valor solicitado R$ {credit.value}</strong></p>
                                    </li>
                                )}
                                
                            
                            </div>):<div className="credit"> <p id=""> <strong> Você não tem solicitações de Emprestimo </strong></p> </div>
                        }
                         <NavLink exact activeClassName="active" to="/credit"> <button className="btn">Solicitar Crédito</button> </NavLink>
                    </div>
                    <div className="lloan">
                        { loans?.length > 0?
                        (<div className="loan">
                            {loans.map((loan,index) =>(
                                <li key={index} >
                                        <p id="header"> <strong>Valor solicitado R$ {loan.totalValue.toFixed(2)} em {loan.deadline}</strong></p>
                                        {loan.loanResponses.map(installment =>(
                                            <li>
                                                {installment.installment}<br/>
                                                <p>{installment.installmentValue} vence em <strong> {installment.dueDate} </strong></p>
                                            </li>
                                        ))}
                                </li>

                            ))}
                        </div>):<div className="loan">
                            <p id=""> <strong> Você não tem solicitações de Emprestimo </strong></p>
                        </div>
                        }
                       <NavLink exact activeClassName="active" to="/loan"> <button className="btn1">Solicitar Emprestimo</button> </NavLink>
                    </div>
                </div>
            </div>
        );
    };
};

export default Home