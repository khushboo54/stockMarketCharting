package com.khushboo.StockMarketCharting.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StockExchangeDto {
    private int id;
    private String stockExchangeName;
    private String brief;
    private String contactAddress;
    private String remarks;

}
