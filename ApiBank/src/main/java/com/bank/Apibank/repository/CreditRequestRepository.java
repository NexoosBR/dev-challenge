package com.bank.Apibank.repository;

import com.bank.Apibank.api.dto.response.CreditRequestResponse;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CreditRequestRepository extends MongoRepository<CreditRequestResponse, String> {
}
