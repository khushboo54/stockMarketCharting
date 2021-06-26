package com.khushboo.StockMarketCharting.service;

import com.khushboo.StockMarketCharting.dto.CompanyDto;
import com.khushboo.StockMarketCharting.dto.SectorDto;

import java.util.List;

public interface SectorsService {
    public SectorDto save(SectorDto sectorDto);
    public void deleteById(int id);
    public List<SectorDto> findAll();
    public SectorDto findById(int id);
    public List<CompanyDto> getCompanies(int id);
    public List<CompanyDto> getSectorCompanies(String sectorName);
    public SectorDto addCompanyToSector(String sectorName, CompanyDto companyDto);
}
