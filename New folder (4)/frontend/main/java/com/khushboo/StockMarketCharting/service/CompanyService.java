package com.khushboo.StockMarketCharting.service;

import com.khushboo.StockMarketCharting.dto.CompanyDto;
import com.khushboo.StockMarketCharting.dto.IPODto;
import com.khushboo.StockMarketCharting.dto.StockPriceDto;

import java.util.List;

public interface CompanyService {
    public List<CompanyDto> getCompanies();
    public CompanyDto findById(int id);
    public List<CompanyDto> getMatchingCompanies(String pattern);
    public CompanyDto addCompany(CompanyDto companyDto);
    public void deleteCompany(int id);
    public CompanyDto addIpoToCompany(String companyName, IPODto ipoDto);
    public List<IPODto> getCompanyIpoDetails(int id);
    public CompanyDto addStockPriceToCompany(String companyCode, StockPriceDto stockPriceDto);
    public List<StockPriceDto> getStockPrices(String companyName);
}
