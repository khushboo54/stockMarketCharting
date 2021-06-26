package com.khushboo.StockMarketCharting.serviceImpl;

import com.khushboo.StockMarketCharting.dto.CompanyDto;
import com.khushboo.StockMarketCharting.dto.IPODto;
import com.khushboo.StockMarketCharting.mapper.IpoMapper;
import com.khushboo.StockMarketCharting.model.Company;
import com.khushboo.StockMarketCharting.model.Ipo;
import com.khushboo.StockMarketCharting.repository.CompanyRepository;
import com.khushboo.StockMarketCharting.repository.IpoRepository;
import com.khushboo.StockMarketCharting.service.CompanyService;
import com.khushboo.StockMarketCharting.service.IpoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IpoServiceImpl implements IpoService {
    @Autowired
    private IpoRepository ipoRepository;

    @Autowired
    private IpoMapper ipoMapper;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private CompanyRepository companyRepository;


    @Override
    public List<IPODto> findAll() {
        List<Ipo> ipos = ipoRepository.findAll();
        return ipoMapper.toIPODtos(ipos);
    }

    @Override
    public IPODto findById(int id) {
        Optional<Ipo> ipo = ipoRepository.findById(id);
        if(!ipo.isPresent())
            return null;
        return ipoMapper.toIPODto(ipo.get());
    }

    @Override
    public IPODto save(IPODto ipoDto) {
        Ipo ipo = ipoMapper.toIPO(ipoDto);
        String name = ipo.getCompanyName();
        Company company = companyRepository.findByCompanyName(name);
        ipo.setCompany(company);
        ipo = ipoRepository.save(ipo);
        ipoDto = ipoMapper.toIPODto(ipo);
        CompanyDto companyDto = companyService.addIpoToCompany(name, ipoDto);
        if(companyDto == null)
            return null;
        return ipoDto;
    }

    @Override
    public void deleteById(int id) {
        ipoRepository.deleteById(id);
    }
}
