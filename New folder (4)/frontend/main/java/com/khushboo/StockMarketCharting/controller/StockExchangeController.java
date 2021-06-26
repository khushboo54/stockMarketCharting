package com.khushboo.StockMarketCharting.controller;

import com.khushboo.StockMarketCharting.dto.CompanyDto;
import com.khushboo.StockMarketCharting.dto.StockExchangeDto;
import com.khushboo.StockMarketCharting.exception.NotFoundException;
import com.khushboo.StockMarketCharting.model.Company;
import com.khushboo.StockMarketCharting.repository.StockExchangeRepository;
import com.khushboo.StockMarketCharting.service.StockExchangeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins ="http://localhost:3000")
public class StockExchangeController {
    @Autowired
    private StockExchangeService stockExchangeService;

    @Autowired
    private StockExchangeRepository stockExchangeRepository;

    @RequestMapping(value = "/stockExchanges",method= RequestMethod.GET)
    public ResponseEntity<List<StockExchangeDto>> findAll() {
        return ResponseEntity.ok(stockExchangeService.findAll());
    }

    @RequestMapping(value = "/stockExchanges/{id}",method=RequestMethod.GET)
    public ResponseEntity<StockExchangeDto> findById(@PathVariable int id)
            throws NotFoundException
    {
        StockExchangeDto stockExchangeDto = stockExchangeService.findById(id);
        if(stockExchangeDto == null) {
            throw new NotFoundException("Stock Exchange Not Found for id : " + id);
        }
        return ResponseEntity.ok(stockExchangeDto);
    }

    @RequestMapping(value = "/stockExchanges",method=RequestMethod.POST)
    public ResponseEntity<StockExchangeDto> save(@RequestBody StockExchangeDto stockExchangeDto) {
        return ResponseEntity.ok(stockExchangeService.save(stockExchangeDto));
    }

    @RequestMapping(value = "/stockExchanges",method=RequestMethod.PUT)
    public ResponseEntity<StockExchangeDto> update(@RequestBody StockExchangeDto stockExchangeDto)
            throws NotFoundException
    {
        StockExchangeDto updatedStockExchangeDto = stockExchangeService.update(stockExchangeDto);
        if(updatedStockExchangeDto == null) {
            throw new NotFoundException("Stock Exchange Not Found for id : " + stockExchangeDto.getId());
        }
        return ResponseEntity.ok(updatedStockExchangeDto);
    }

    @RequestMapping(value = "/stockExchanges/{id}",method=RequestMethod.DELETE)
    public void delete(@PathVariable int id) {
        stockExchangeService.delete(id);
    }

    @RequestMapping(value = "/stockExchangescomp/{id}",method=RequestMethod.GET)
    public ResponseEntity<List<CompanyDto>> getCompanies(@PathVariable int id)
            throws NotFoundException
    {
        List<CompanyDto> companyDtos = stockExchangeService.getCompanies(id);
        if(companyDtos == null) {
            throw new NotFoundException("Stock Exchange Not Found for id : " + id);
        }
        return ResponseEntity.ok(companyDtos);
    }


    @PostMapping(path = "/{stockExchangeName}/{companyCode}/companies")
    public void addCompanyToStockExchange(@PathVariable String stockExchangeName,@PathVariable String companyCode, @RequestBody Company company)
            throws NotFoundException
    {
        StockExchangeDto stockExchangeDto = stockExchangeService.addCompanyToStockExchange(stockExchangeName,companyCode,company);
        if(stockExchangeDto == null) {
            throw new NotFoundException("Stock Exchange Not Found with name : " + stockExchangeName);
        }
    }
}
