package com.khushboo.StockMarketCharting.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CompanyCompareRequest {
    private String companyCode;
    private String stockExchangeName;
    private String fromPeriod;
    private String toPeriod;
    private String periodicity;
}
