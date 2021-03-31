package com.bank.Apibank.service.spec;

import com.bank.Apibank.api.dto.response.CreditRequestResponse;
import com.bank.Apibank.api.dto.response.LoanRequestResponse;
import com.bank.Apibank.domain.Loan;
import com.bank.Apibank.domain.Requester;
import org.jetbrains.annotations.NotNull;

import java.util.List;

public interface RequesterService {
    public String newRequester(Requester requester);
    public List<Requester> getAllRequester();
    public Requester getRequester(String token);
    public Object newCreditRequest(CreditRequestResponse creditRequestResponse);
    public List<CreditRequestResponse> getAllCreditRequest();
    public  Object getCreditRequestByRequester(String token);
    public Object newLoanRequest(@NotNull LoanRequestResponse loanRequestResponse);
    public List<LoanRequestResponse> getAllLoanRequest();
    public  Object getLoanRequestByRequester(String token);
    public String getTokenRequester(String cnpj, String password);
    public List<Loan> getLoanByToken(String token);
}