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
public class IPODto {
    private int id;
    private BigDecimal price;
    private int shares;
    private String openDateTime;
    private String remarks;
    private String companyName;
    private String stockExchangeName;
}
