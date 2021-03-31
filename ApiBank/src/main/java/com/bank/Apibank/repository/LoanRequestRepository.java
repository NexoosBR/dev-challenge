package com.bank.Apibank.repository;

import com.bank.Apibank.api.dto.response.LoanRequestResponse;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LoanRequestRepository extends MongoRepository<LoanRequestResponse, String> {
}
