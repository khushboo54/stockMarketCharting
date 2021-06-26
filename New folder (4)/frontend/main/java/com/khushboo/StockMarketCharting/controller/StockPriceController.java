package com.khushboo.StockMarketCharting.controller;

import com.khushboo.StockMarketCharting.dto.CompanyCompareRequest;
import com.khushboo.StockMarketCharting.dto.SectorCompareRequest;
import com.khushboo.StockMarketCharting.dto.StockPriceDto;
import com.khushboo.StockMarketCharting.exception.NotFoundException;
import com.khushboo.StockMarketCharting.mapper.StockPriceMapper;
import com.khushboo.StockMarketCharting.service.StockPriceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@CrossOrigin(origins ="http://localhost:3000")
public class StockPriceController {
    @Autowired
    private StockPriceService stockPriceService;

    @Autowired
    private StockPriceMapper stockPriceMapper;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/stockPrices",method = RequestMethod.GET)
    public ResponseEntity<List<StockPriceDto>> findAll() {
        return ResponseEntity.ok(stockPriceService.findAll());
    }

    @RequestMapping(value = "/stockPrices/{id}",method = RequestMethod.GET)
    public ResponseEntity<StockPriceDto> findById(@PathVariable int id)
            throws NotFoundException
    {
        StockPriceDto stockPriceDto = stockPriceService.findById(id);
        if(stockPriceDto == null) {
            throw new NotFoundException("Stock Price Not Found with id : " + id);
        }
        return ResponseEntity.ok(stockPriceDto);
    }

    @RequestMapping(value = "/stockPricescomp",method = RequestMethod.GET)
    public ResponseEntity<?> companyComparison(@RequestBody CompanyCompareRequest compareRequest)
    {
        List<StockPriceDto> stockPriceDtos = null;
        try {
            stockPriceDtos = stockPriceService.getStockPricesForCompanyComparison(compareRequest);
        } catch (ParseException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Invalid Date Format");
        }
        return ResponseEntity.ok(stockPriceDtos);
    }

    @RequestMapping(value = "/stockPricesec",method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> sectorComparison(@RequestBody SectorCompareRequest compareRequest)
    {
        List<StockPriceDto> stockPriceDtos = null;
        try {
            stockPriceDtos = stockPriceService.getStockPricesForSectorComparison(compareRequest);
            logger.info("Data->",stockPriceMapper.toStockPrices(stockPriceDtos));
        } catch (ParseException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Invalid Date Format");
        }
        return ResponseEntity.ok(stockPriceDtos);
    }

    @RequestMapping(value = "/stockPrices",method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> save(@RequestBody List<StockPriceDto> stockPriceDtos) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(stockPriceService.save(stockPriceDtos));
    }

    @RequestMapping(value = "/stockPrices",method = RequestMethod.PUT)
    public ResponseEntity<StockPriceDto> update(@RequestBody StockPriceDto stockPriceDto)
            throws NotFoundException
    {
        StockPriceDto updatedStockPriceDto = stockPriceService.update(stockPriceDto);
        if(updatedStockPriceDto == null) {
            throw new NotFoundException("Stock Price not found with id : " + stockPriceDto.getId());
        }
        return ResponseEntity.ok(updatedStockPriceDto);
    }

    @RequestMapping(value = "/stockPrices/{id}",method = RequestMethod.DELETE)
    public void deleteById(@PathVariable int id) {
        stockPriceService.deleteById(id);
    }

}
