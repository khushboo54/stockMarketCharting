package com.khushboo.StockMarketCharting.service;

import com.khushboo.StockMarketCharting.dto.CompanyDto;
import com.khushboo.StockMarketCharting.dto.StockExchangeDto;
import com.khushboo.StockMarketCharting.model.Company;

import java.util.List;

public interface StockExchangeService {
    public List<StockExchangeDto> findAll();
    public StockExchangeDto findById(int id);
    public StockExchangeDto save(StockExchangeDto stockExchangeDto);
    public StockExchangeDto update(StockExchangeDto stockExchangeDto);
    public void delete(int id);
    public List<CompanyDto> getCompanies(int id);
    public StockExchangeDto addCompanyToStockExchange(String stockExchangeName,String companyCode, Company company);

}
