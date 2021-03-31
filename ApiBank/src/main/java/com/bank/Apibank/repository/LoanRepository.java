package com.bank.Apibank.repository;


import com.bank.Apibank.domain.Loan;
import com.bank.Apibank.domain.Requester;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LoanRepository extends MongoRepository<Loan, String> {
    public List<Loan> findLoanByToken(String token);
}
