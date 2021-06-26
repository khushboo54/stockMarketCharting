package com.khushboo.StockMarketCharting.service;

import com.khushboo.StockMarketCharting.dto.CompanyCompareRequest;
import com.khushboo.StockMarketCharting.dto.SectorCompareRequest;
import com.khushboo.StockMarketCharting.dto.StockPriceDto;

import java.text.ParseException;
import java.util.List;

public interface StockPriceService {
    public List<StockPriceDto> findAll();
    public StockPriceDto findById(int id);
    public void deleteById(int id);
    public List<StockPriceDto> save(List<StockPriceDto> stockPriceDtos);
    public StockPriceDto update(StockPriceDto stockPriceDto);
    public List<StockPriceDto> getStockPricesForCompanyComparison(CompanyCompareRequest compareRequest)throws ParseException;
    public List<StockPriceDto> getStockPricesForSectorComparison(SectorCompareRequest compareRequest)throws ParseException;

}
