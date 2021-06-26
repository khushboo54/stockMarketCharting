package com.khushboo.StockMarketCharting.service;


import com.khushboo.StockMarketCharting.StockMarketChartingApplication;
import com.khushboo.StockMarketCharting.dto.CompanyDto;
import com.khushboo.StockMarketCharting.dto.SectorDto;
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
class SectorServiceTest {

    @Autowired
    private SectorsService sectorService;


    @Test
    @DirtiesContext
    void save() {
        SectorDto sectorDto = sectorService.save(new SectorDto(1145,"Hostels", "Companies that provide with accomodation services"));
        assertEquals("Hostels",sectorDto.getName());
    }

    @Test
    @DirtiesContext
    void deleteById() {
        sectorService.deleteById(10002);
        assertNull(sectorService.findById(10002));
    }

    @Test
    void findAll() {
        List<SectorDto> sectorDtos=sectorService.findAll();
        assertNotNull(sectorDtos);

    }

    @Test
    void findById() {
        SectorDto sectorDto=sectorService.findById(10001);
        assertEquals("Pharmaceutical",sectorDto.getName());
    }

    @Test
    @Transactional
    void getCompanies() {
        List<CompanyDto> companyDtos = sectorService.getCompanies(10001);
        assertNotNull(companyDtos);

    }

    @Test
    @Transactional
    void getSectorCompanies() {
        List<CompanyDto> companyDtos = sectorService.getSectorCompanies("Telecom");
        assertNotNull(companyDtos);
    }
}