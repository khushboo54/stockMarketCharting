package com.khushboo.StockMarketCharting.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CompanyDto {
    private int id;
    private String companyName;
    private String ceo;
    private String boardOfDirectors;
    private String description;
    private BigDecimal turnover;
    private String companyCode;
    private String stockExchangeName;
    private String sectorName;
}
