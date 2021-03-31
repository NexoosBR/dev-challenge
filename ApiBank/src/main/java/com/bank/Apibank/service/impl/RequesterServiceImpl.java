package com.bank.Apibank.service.impl;

import com.bank.Apibank.api.dto.response.CreditRequestResponse;
import com.bank.Apibank.api.dto.response.LoanRequestResponse;
import com.bank.Apibank.api.dto.response.LoanResponse;
import com.bank.Apibank.domain.Loan;
import com.bank.Apibank.domain.Requester;
import com.bank.Apibank.repository.CreditRequestRepository;
import com.bank.Apibank.repository.LoanRepository;
import com.bank.Apibank.repository.LoanRequestRepository;
import com.bank.Apibank.repository.RequesterRepository;
import com.bank.Apibank.service.spec.RequesterService;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.*;

@Service
public class RequesterServiceImpl implements RequesterService {

    @Autowired
    private RequesterRepository requesterRepository;
    @Autowired
    private CreditRequestRepository creditRequestRepository;
    @Autowired
    private LoanRequestRepository loanRequestRepository;
    @Autowired
    private LoanRepository loanRepository;

    @Override
    public String newRequester(Requester requester){
        String token = UUID.randomUUID().toString();
        requester.setToken(token);
        this.requesterRepository.save(requester);
        return token;
    }

    @Override
    public List<Requester> getAllRequester(){ return this.requesterRepository.findAll();}

    @Override
    public Requester getRequester(String token){
        return this.requesterRepository.findById(token).orElseThrow(() -> new IllegalArgumentException("Non-existent requester"));
    }

    @Override
    public String getTokenRequester(String cnpj, String password){
        return requesterRepository.findByCnpjAndPassword(cnpj,password).getToken();
    }

    @Override
    public Object newCreditRequest(@NotNull CreditRequestResponse creditRequestResponse){
        if (getRequester(creditRequestResponse.getToken()).equals("Non-existent requester")){
            return new IllegalArgumentException("Non-existent requester");
        }else{return this.creditRequestRepository.save(creditRequestResponse);}
    }

    @Override
    public List<CreditRequestResponse> getAllCreditRequest(){return this.creditRequestRepository.findAll();}

    @Override
    public  Object getCreditRequestByRequester(String token){
        List<CreditRequestResponse> creditRequestResponseByRequester = new ArrayList<>();

        if (getRequester(token).equals("Non-existent requester")){
            return new IllegalArgumentException("Non-existent requester");
        }else{
            for(CreditRequestResponse creditRequestResponse :getAllCreditRequest()){
                if (creditRequestResponse.getToken().equals(token)){
                    creditRequestResponseByRequester.add(creditRequestResponse);
                }
            }
            if(creditRequestResponseByRequester.size()==0){
                return new IllegalArgumentException(String.format("Non-existent credit request from %s", token));
            }else{return creditRequestResponseByRequester;}
        }

    }

    @Override
    public Object newLoanRequest(@NotNull LoanRequestResponse loanRequestResponse){
        if (getRequester(loanRequestResponse.getToken()).equals("Non-existent requester")){
            return new IllegalArgumentException("Non-existent requester");
        }else{
            this.loanRequestRepository.save(loanRequestResponse);
            List<LoanResponse> loanResponses = new ArrayList<>();
            Calendar date = Calendar.getInstance();

            float rate = loanRequestResponse.getInterestRate()/100;

            float aux = (float) Math.pow((1+rate),loanRequestResponse.getDeadline() );

            float pmt =  loanRequestResponse.getValue() * ((aux*rate)/(aux-1));


            for (int i = 0; i < (loanRequestResponse.getDeadline()); i++) {
                date.add(Calendar.MONTH,(1));
                loanResponses.add(
                    LoanResponse
                            .builder()
                            .dueDate(date.get(Calendar.DAY_OF_MONTH) + "/" + (date.get(Calendar.MONTH)+1) + "/" + date.get(Calendar.YEAR))
                            .installment(i+1 + "x")
                            .installmentValue("R$ " + pmt)
                            .build()
                    );
            }
            return loanRepository.save(Loan.builder().totalValue(loanRequestResponse.getValue()).deadline(loanRequestResponse.getDeadline() + "x").loanResponses(loanResponses).token(loanRequestResponse.getToken()).build());
        }
    }

    @Override
    public List<LoanRequestResponse> getAllLoanRequest(){return this.loanRequestRepository.findAll();}

    @Override
    public  Object getLoanRequestByRequester(String token){
        if ((getRequester(token).getToken()).equals("Non-existent requester")){
            return new IllegalArgumentException("Non-existent requester");
        }else{
            List<LoanRequestResponse> loanRequestResponseByRequester = new ArrayList<>();
            for(LoanRequestResponse loanRequestResponse :getAllLoanRequest()){
                if (loanRequestResponse.getToken().equals(token)){
                    loanRequestResponseByRequester.add(loanRequestResponse);
                }
            }
            if(loanRequestResponseByRequester.size()==0){
                return new IllegalArgumentException(String.format("Non-existent loan request from %s", token));
            }else{return loanRequestResponseByRequester;}
        }
    }

    @Override
    public List<Loan> getLoanByToken(String token){
        return this.loanRepository.findLoanByToken(token);
    }

}