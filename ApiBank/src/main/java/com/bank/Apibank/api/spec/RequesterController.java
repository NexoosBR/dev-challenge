package com.bank.Apibank.api.spec;

import com.bank.Apibank.api.dto.response.CreditRequestResponse;
import com.bank.Apibank.api.dto.response.LoanRequestResponse;
import com.bank.Apibank.domain.Requester;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface RequesterController {

    public String newRequester(@RequestBody Requester requester);

    public List<Requester> getAllRequester();

    public Requester getRequester(@PathVariable("requester") String requester);

    public Object newCreditRequest(@RequestBody CreditRequestResponse creditRequestResponse);

    public List<CreditRequestResponse> getAllCreditRequest();

    public Object getCreditRequestByRequester(@PathVariable("token") String requesterCNPJ);

    public Object newLoanRequest(@RequestBody LoanRequestResponse loanRequestResponse);

    public Object getLoanByToken(@PathVariable("token") String token);

    public String getTokenRequester(@PathVariable("requesterCNPJ") String requesterCNPJ,@PathVariable("requesterCNPJ") String password);

    public Object getLoanRequestByToken(@PathVariable("token") String token);

}
