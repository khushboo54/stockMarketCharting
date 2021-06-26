package com.khushboo.StockMarketCharting.controller;

import com.khushboo.StockMarketCharting.dto.CompanyDto;
import com.khushboo.StockMarketCharting.dto.IPODto;
import com.khushboo.StockMarketCharting.dto.StockPriceDto;
import com.khushboo.StockMarketCharting.exception.NotFoundException;
import com.khushboo.StockMarketCharting.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins ="http://localhost:3000")
public class CompanyController {
    @Autowired
    private CompanyService companyService;

    @RequestMapping(value = "/companies",method= RequestMethod.GET)
    public ResponseEntity<List<CompanyDto>> getCompanies()
    {
        return ResponseEntity
                .ok(companyService.getCompanies());
    }

    @RequestMapping(value = "/companies/{id}",method=RequestMethod.GET)
    public ResponseEntity<CompanyDto> getCompanyDetails(@PathVariable int id)
            throws NotFoundException
    {
        CompanyDto companyDto = companyService.findById(id);
        if(companyDto == null) {
            throw new NotFoundException("Company not found at id : " + id);
        }
        return ResponseEntity.ok(companyDto);
    }

    @RequestMapping(value = "/companiesmatch/{pattern}",method=RequestMethod.GET)
    public ResponseEntity<List<CompanyDto>> getMatchingCompanies(@PathVariable String pattern)
    {
        return ResponseEntity.ok(companyService.getMatchingCompanies(pattern));
    }

    @RequestMapping(value = "/companyipos/{id}",method=RequestMethod.GET)
    public ResponseEntity<List<IPODto>> getCompanyIpoDetails(@PathVariable int id)
            throws NotFoundException
    {
        List<IPODto> ipoDtos = companyService.getCompanyIpoDetails(id);
        if(ipoDtos == null) {
            throw new NotFoundException("Company not found at id : " + id);
        }
        return ResponseEntity.ok(ipoDtos);
    }

    @RequestMapping(value = "/companystockprices/{id}",method=RequestMethod.GET)
    public ResponseEntity<List<StockPriceDto>> getStockPrices(@PathVariable int id)
            throws NotFoundException
    {
        CompanyDto company = companyService.findById(id);
        List<StockPriceDto> stockPriceDtos = companyService.getStockPrices(company.getCompanyName());
        if(stockPriceDtos == null) {
            throw new NotFoundException("Company not found at id : " + id);
        }
        return ResponseEntity.ok(stockPriceDtos);
    }

    @RequestMapping(value = "/companies",method=RequestMethod.POST)
    public ResponseEntity<?> addCompany(@RequestBody CompanyDto companyDto) {
        return ResponseEntity.ok(companyService.addCompany(companyDto));
    }

    @RequestMapping(value = "/companies",method=RequestMethod.PUT)
    public ResponseEntity<CompanyDto> editCompany(@RequestBody CompanyDto companyDto)
            throws NotFoundException
    {
        CompanyDto updatedCompanyDto = companyService.addCompany(companyDto);
        if(updatedCompanyDto == null) {
            throw new NotFoundException("Company not found at id : " + companyDto.getId());
        }
        return ResponseEntity.ok(updatedCompanyDto);
    }

    @RequestMapping(value = "/companies/{id}",method=RequestMethod.DELETE)
    public void deleteCompany(@PathVariable int id) {
        companyService.deleteCompany(id);
    }

    /* Feign Client Mappings */

    @PostMapping(path = "/{companyName}/ipos")
    public void addIpoToCompany(@PathVariable String companyName, @RequestBody IPODto ipoDto)
            throws NotFoundException
    {
        CompanyDto companyDto = companyService.addIpoToCompany(companyName, ipoDto);
        if(companyDto == null) {
            throw new NotFoundException("Company not with name : " + companyName);
        }
    }

    @PostMapping(path = "/{companyCode}/stockPrices")
    public void addStockPriceToCompany(@PathVariable String companyCode, @RequestBody StockPriceDto stockPriceDto)
            throws NotFoundException
    {
        CompanyDto companyDto = companyService.addStockPriceToCompany(companyCode, stockPriceDto);
        if(companyDto == null) {
            throw new NotFoundException("Company not with code : " + companyCode);
        }
    }

}
