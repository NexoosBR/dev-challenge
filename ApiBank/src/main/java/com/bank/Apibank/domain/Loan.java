package com.bank.Apibank.domain;

import com.bank.Apibank.api.dto.response.LoanResponse;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
@Builder
public class Loan {
    float totalValue;
    String deadline;
    String token;
    List<LoanResponse>loanResponses;
}
