package com.khushboo.StockMarketCharting.dto;

import lombok.*;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StockPriceDto {
    private int id;
    private BigDecimal currentPrice;
    private String date;
    private String time;
    private String companyCode;
    private String stockExchangeName;
}
