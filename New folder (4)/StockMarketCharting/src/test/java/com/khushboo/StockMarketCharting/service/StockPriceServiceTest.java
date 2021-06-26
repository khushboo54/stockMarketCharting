package com.khushboo.StockMarketCharting.service;


import com.khushboo.StockMarketCharting.StockMarketChartingApplication;
import com.khushboo.StockMarketCharting.dto.StockPriceDto;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.aspectj.runtime.internal.Conversions.intValue;
import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = StockMarketChartingApplication.class)
class StockPriceServiceTest {

    @Autowired
    private StockPriceService stockPriceService;


    @Test
    void findAll() {
        List<StockPriceDto> stockPriceDtos = stockPriceService.findAll();
        assertNotNull(stockPriceDtos);
    }

    @Test
    void findById() {
        StockPriceDto stockPriceDto = stockPriceService.findById(50001);
        assertEquals("NSE",stockPriceDto.getStockExchangeName());
    }

    @Test
    @DirtiesContext
    @Transactional
    void save() {
        StockPriceDto stockPriceDto1 = new StockPriceDto(1234, BigDecimal.valueOf(intValue(12345)),"qwer","qwer","QW123","NSE");
        StockPriceDto stockPriceDto2 = new StockPriceDto(1235, BigDecimal.valueOf(intValue(12245)),"qwert","qweer","QW123","NSE");
        StockPriceDto stockPriceDto3 = new StockPriceDto(1236, BigDecimal.valueOf(intValue(12355)),"qwerq","qwerq","QW123","NSE");
        List<StockPriceDto> stockPriceDtos = new ArrayList<StockPriceDto>();
        stockPriceDtos.add(stockPriceDto1);
        stockPriceDtos.add(stockPriceDto2);
        stockPriceDtos.add(stockPriceDto3);
        List<StockPriceDto> stockPriceDtos1 = stockPriceService.save(stockPriceDtos);
        assertNotNull(stockPriceDtos1.containsAll(stockPriceDtos));
    }

    @Test
    @DirtiesContext
    @Transactional
    void update() {
        StockPriceDto stockPriceDto = stockPriceService.update(new StockPriceDto(50001,BigDecimal.valueOf(intValue(12355)),"12-07-21","12:43:32","QW342","NSE"));
        assertEquals("NSE",stockPriceDto.getStockExchangeName());
    }

    @Test
    @DirtiesContext
    @Transactional
    void deleteById() {
        stockPriceService.deleteById(50001);
        assertNull(stockPriceService.findById(50001));
    }

    @Test
    @Transactional
    void getStockPricesForCompanyComparison() {
    }

    @Test
    @Transactional
    void getStockPricesForSectorComparison() {
    }
}