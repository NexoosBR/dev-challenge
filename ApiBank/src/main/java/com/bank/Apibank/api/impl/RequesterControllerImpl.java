package com.bank.Apibank.api.impl;

import com.bank.Apibank.api.dto.response.CreditRequestResponse;
import com.bank.Apibank.api.dto.response.LoanRequestResponse;
import com.bank.Apibank.api.spec.RequesterController;
import com.bank.Apibank.domain.Requester;
import com.bank.Apibank.service.impl.RequesterServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("requester")
public class RequesterControllerImpl implements RequesterController {

    @Autowired
    RequesterServiceImpl requesterService;

    @PostMapping(path = "send")
    public String newRequester(@RequestBody Requester requester){
        return requesterService.newRequester(requester);
    }

    @GetMapping(path = "getAll")
    public List<Requester> getAllRequester(){

        return requesterService.getAllRequester();

    }

    @GetMapping(path = "get/{requesterCNPJ}")
    public Requester getRequester(@PathVariable("requesterCNPJ") String requesterCNPJ){
        return requesterService.getRequester(requesterCNPJ);
    }
    @GetMapping(path = "gets/{requesterCNPJ}/{password}")
    public String getTokenRequester(@PathVariable("requesterCNPJ") String requesterCNPJ,@PathVariable("password") String password){
        return requesterService.getTokenRequester(requesterCNPJ,password);
    }

    @PostMapping(path = "request")
    public Object newCreditRequest(@RequestBody CreditRequestResponse creditRequestResponse){
        return requesterService.newCreditRequest(creditRequestResponse);
    }

    @GetMapping(path = "request/getAll")
    public List<CreditRequestResponse> getAllCreditRequest(){
        return requesterService.getAllCreditRequest();
    }

    @GetMapping(path = "request/get/{token}")
    public Object getCreditRequestByRequester(@PathVariable("token") String token){
        return requesterService.getCreditRequestByRequester(token);
    }

    @PostMapping(path = "loan")
    public Object newLoanRequest(@RequestBody LoanRequestResponse loanRequestResponse){
        return requesterService.newLoanRequest(loanRequestResponse);
    }

    @GetMapping(path = "loan/get/{token}")
    public Object getLoanByToken(@PathVariable("token") String token){
        System.out.println(token);
        return requesterService.getLoanByToken(token);
    }

    @GetMapping(path = "loan/getRequest/{token}")
    public Object getLoanRequestByToken(@PathVariable("token") String token){
        System.out.println(token);
        return requesterService.getLoanRequestByRequester(token);
    }

}