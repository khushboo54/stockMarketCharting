package com.khushboo.StockMarketCharting.service;


import com.khushboo.StockMarketCharting.StockMarketChartingApplication;
import com.khushboo.StockMarketCharting.dto.IPODto;
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
class IpoServiceTest {

    @Autowired
    private IpoService ipoService;


    @Test
    void findAll() {
        List<IPODto> ipoDtos = ipoService.findAll();
        assertNotNull(ipoDtos);
    }

    @Test
    void findById() {
        IPODto ipoDto = ipoService.findById(40001);
        assertEquals("Britannia",ipoDto.getCompanyName());
    }

    @Test
    @DirtiesContext
    @Transactional
    void save() {
        IPODto ipoDto = ipoService.save(new IPODto(43217, BigDecimal.valueOf(intValue(123.4)),1400,"11-06-09 18:33:05","qwerty","Britannia","NSE"));
        assertEquals("Britannia",ipoDto.getCompanyName());

    }

    @Test
    @DirtiesContext
    void deleteById() {
        ipoService.deleteById(40001);
        assertNull(ipoService.findById(40001));
    }
}