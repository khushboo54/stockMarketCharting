package com.khushboo.StockMarketCharting.service;

import com.khushboo.StockMarketCharting.StockMarketChartingApplication;
import com.khushboo.StockMarketCharting.dto.CompanyDto;
import com.khushboo.StockMarketCharting.dto.IPODto;
import com.khushboo.StockMarketCharting.dto.StockPriceDto;
import com.khushboo.StockMarketCharting.repository.CompanyRepository;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;

import static org.aspectj.runtime.internal.Conversions.intValue;
import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = StockMarketChartingApplication.class)
class CompanyServiceTest {

    @Autowired
    private CompanyService companyService;

    @Autowired
    private CompanyRepository companyRepository;

    @Test
    void getCompanies() {
        List<CompanyDto> companyDtos= companyService.getCompanies();
        assertNotNull(companyDtos);
    }

    @Test
    void findById() {
        CompanyDto companyDto = companyService.findById(30003);
        assertEquals("Britannia",companyDto.getCompanyName());
    }

    @Test
    void getMatchingCompanies() {
        List<CompanyDto> companyDtos =companyService.getMatchingCompanies("Brit");
        assertEquals("Britannia",(companyDtos.get(0)).getCompanyName());
    }

    @Test
    @DirtiesContext
    @Transactional
    void addCompany() {
        CompanyDto companyDto = new CompanyDto(30032,"Hersheys","ABC","QWERTYU","ASDFGHJ", BigDecimal.valueOf(intValue(12345)),"AQW32","NSE","FoodNAgro");
        CompanyDto companyDto1 = companyService.addCompany(companyDto);
        assertEquals("Hersheys",companyDto1.getCompanyName());
    }


    @Test
    @DirtiesContext
    @Transactional
    void deleteCompany() {
        companyService.deleteCompany(30001);
        assertNull(companyService.findById(30001));
    }

    @Test
    @Transactional
    void getCompanyIpoDetails() {
        List<IPODto> ipoDtos = companyService.getCompanyIpoDetails(30001);
        assertNotNull(ipoDtos);
    }

    @Test
    @Transactional
    void getStockPrices() {
        List<StockPriceDto> stockPriceDtos = companyService.getStockPrices("Britannia");
        assertNotNull(stockPriceDtos);
    }
}