package com.khushboo.StockMarketCharting.serviceImpl;

import com.khushboo.StockMarketCharting.dto.CompanyDto;
import com.khushboo.StockMarketCharting.dto.SectorDto;
import com.khushboo.StockMarketCharting.mapper.CompanyMapper;
import com.khushboo.StockMarketCharting.mapper.SectorMapper;
import com.khushboo.StockMarketCharting.model.Sectors;
import com.khushboo.StockMarketCharting.repository.SectorsRepository;
import com.khushboo.StockMarketCharting.service.SectorsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SectorsServiceImpl implements SectorsService {
    @Autowired
    private SectorsRepository sectorRepository;

    @Autowired
    private SectorMapper sectorMapper;

    @Autowired
    private CompanyMapper companyMapper;

    @Override
    public SectorDto save(SectorDto sectorDto) {
        Sectors sector = sectorMapper.toSector(sectorDto);
        sector = sectorRepository.save(sector);
        return sectorMapper.toSectorDto(sector);
    }

    @Override
    public List<SectorDto> findAll() {
        Iterable<Sectors> sa = sectorRepository.findAll();

        List<Sectors> sectors = new ArrayList<>();

        // Add each element of iterator to the List
        for (Sectors s : sa) {
            sectors.add(s);
        }

        return sectorMapper.toSectorDtos(sectors);
    }

    @Override
    public SectorDto findById(int id) {
        Optional<Sectors> sector = sectorRepository.findById(id);
        if(!sector.isPresent())
            return null;
        return sectorMapper.toSectorDto(sector.get());
    }

    @Override
    public void deleteById(int id) {
        sectorRepository.deleteById(id);
    }

    @Override
    public List<CompanyDto> getCompanies(int id)
    {
        Optional<Sectors> sector = sectorRepository.findById(id);
        if(!sector.isPresent())
            return null;
        return companyMapper.toCompanyDtos(sector.get().getCompanies());
    }

    /* Feign Client Service */
    @Override
    public List<CompanyDto> getSectorCompanies(String sectorName)
    {
        Sectors sector = sectorRepository.findByName(sectorName);
        if(sector == null)
            return null;
        return companyMapper.toCompanyDtos(sector.getCompanies());
    }

    @Override
    public SectorDto addCompanyToSector(String sectorName, CompanyDto companyDto)
    {
        Sectors sector = sectorRepository.findByName(sectorName);
        if(sector == null)
            return null;
        sector.getCompanies().add(companyMapper.toCompany(companyDto));
        sector = sectorRepository.save(sector);
        return sectorMapper.toSectorDto(sector);
    }

}
