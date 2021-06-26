package com.khushboo.StockMarketCharting.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SectorCompareRequest {
    private String sectorName;
    private String stockExchangeName;
    private String fromPeriod;
    private String toPeriod;
    private String periodicity;
}
