package com.bank.Apibank.repository;

import com.bank.Apibank.domain.Requester;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RequesterRepository extends MongoRepository<Requester, String> {
    public Requester findByCnpjAndPassword(String companyName, String password);
}
