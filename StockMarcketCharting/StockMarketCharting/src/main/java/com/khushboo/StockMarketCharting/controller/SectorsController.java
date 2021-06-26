package com.khushboo.StockMarketCharting.controller;

import com.khushboo.StockMarketCharting.dto.CompanyDto;
import com.khushboo.StockMarketCharting.dto.SectorDto;
import com.khushboo.StockMarketCharting.exception.NotFoundException;
import com.khushboo.StockMarketCharting.service.SectorsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins ="http://localhost:3000")
public class SectorsController {
    @Autowired
    private SectorsService sectorService;

    @RequestMapping(value = "/sectors",method= RequestMethod.GET)
    public ResponseEntity<List<SectorDto>> findAll() {
        return ResponseEntity.ok(sectorService.findAll());
    }


    @RequestMapping(value = "/sectors/{id}",method=RequestMethod.GET)
    public ResponseEntity<SectorDto> findById(@PathVariable int id)
            throws NotFoundException {
        SectorDto sectorDto = sectorService.findById(id);
        if (sectorDto == null) {
            throw new NotFoundException("Sector not found for id : " + id);
        }
        return ResponseEntity.ok(sectorDto);
    }

    @RequestMapping(value = "/sectors",method=RequestMethod.POST)
    public ResponseEntity<SectorDto> save(@RequestBody SectorDto sectorDto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(sectorService.save(sectorDto));
    }

    @RequestMapping(value = "/sectors",method=RequestMethod.PUT)
    public ResponseEntity<SectorDto> update(@RequestBody SectorDto sectorDto)
            throws NotFoundException {
        SectorDto updatedSectorDto = sectorService.save(sectorDto);
        if (updatedSectorDto == null) {

            throw new NotFoundException("Sector not found for id : " + sectorDto.getId());
        }
        return ResponseEntity.ok(updatedSectorDto);
    }

    @RequestMapping(value = "/sectors/{id}",method=RequestMethod.DELETE)
    public void deleteById(@PathVariable int id) {
        sectorService.deleteById(id);
    }

    @RequestMapping(value = "/sectorscomp/{id}",method=RequestMethod.GET)
    public ResponseEntity<List<CompanyDto>> getCompanies(@PathVariable int id)
            throws NotFoundException
    {
        List<CompanyDto> companyDtos = sectorService.getCompanies(id);
        if(companyDtos == null) {
            throw new NotFoundException("Sector not found for id : " + id);
        }
        return ResponseEntity.ok(companyDtos);
    }

    @PostMapping(path = "/{sectorName}/companies")
    public void addCompanyToSector(@PathVariable String sectorName, @RequestBody CompanyDto companyDto)
            throws NotFoundException
    {
        SectorDto sectorDto = sectorService.addCompanyToSector(sectorName, companyDto);
        if(sectorDto == null) {
            throw new NotFoundException("Sector not found with name : " + sectorName);
        }
    }
}

