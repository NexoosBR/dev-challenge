package com.bank.Apibank.domain;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@Builder
public class Requester {

    String companyName;
    @Id
    String token;
    String cnpj;
    String address;
    String phone;
    String password;

}
