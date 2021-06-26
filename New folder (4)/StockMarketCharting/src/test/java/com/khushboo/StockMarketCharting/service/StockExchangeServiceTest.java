package com.khushboo.StockMarketCharting.service;


import com.khushboo.StockMarketCharting.StockMarketChartingApplication;
import com.khushboo.StockMarketCharting.dto.CompanyDto;
import com.khushboo.StockMarketCharting.dto.StockExchangeDto;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = StockMarketChartingApplication.class)
class StockExchangeServiceTest {


    @Autowired
    private StockExchangeService stockExchangeService;

    @Test
    void findAll() {
        List<StockExchangeDto> stockExchangeDtoList = stockExchangeService.findAll();
        assertNotNull(stockExchangeDtoList);
    }

    @Test
    void findById() {
        StockExchangeDto stockExchangeDto = stockExchangeService.findById(20001);
        assertEquals("NSE",stockExchangeDto.getStockExchangeName());
    }

    @Test
    @DirtiesContext
    @Transactional
    void save() {
        StockExchangeDto stockExchangeDto = stockExchangeService.save(new StockExchangeDto(1234,"QWE","ASDFG","QWERTY","QWERFGH"));
        assertEquals("QWE",stockExchangeDto.getStockExchangeName());
    }

    @Test
    @DirtiesContext
    @Transactional
    void update() {
        StockExchangeDto stockExchangeDto = stockExchangeService.update(new StockExchangeDto(20001,"QWE","ASDFG","QWERTY","QWERFGH"));
        assertEquals("QWE",stockExchangeDto.getStockExchangeName());
    }

    @Test
    @DirtiesContext
    @Transactional
    void delete() {
        stockExchangeService.delete(20001);
        assertNull(stockExchangeService.findById(20001));
    }

    @Test
    @Transactional
    void getCompanies() {
        List<CompanyDto> companyDtos = stockExchangeService.getCompanies(20001);
        assertNotNull(companyDtos);
    }
}