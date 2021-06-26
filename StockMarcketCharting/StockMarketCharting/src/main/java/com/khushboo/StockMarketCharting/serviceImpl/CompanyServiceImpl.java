package com.khushboo.StockMarketCharting.serviceImpl;

import com.khushboo.StockMarketCharting.dto.CompanyDto;
import com.khushboo.StockMarketCharting.dto.IPODto;
import com.khushboo.StockMarketCharting.dto.StockPriceDto;
import com.khushboo.StockMarketCharting.mapper.CompanyMapper;
import com.khushboo.StockMarketCharting.mapper.IpoMapper;
import com.khushboo.StockMarketCharting.mapper.StockPriceMapper;
import com.khushboo.StockMarketCharting.model.Company;
import com.khushboo.StockMarketCharting.model.CompanyStock;
import com.khushboo.StockMarketCharting.model.Ipo;
import com.khushboo.StockMarketCharting.model.Sectors;
import com.khushboo.StockMarketCharting.repository.CompanyRepository;
import com.khushboo.StockMarketCharting.repository.CompanyStockRepository;
import com.khushboo.StockMarketCharting.repository.IpoRepository;
import com.khushboo.StockMarketCharting.repository.SectorsRepository;
import com.khushboo.StockMarketCharting.service.CompanyService;
import com.khushboo.StockMarketCharting.service.SectorsService;
import com.khushboo.StockMarketCharting.service.StockExchangeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyServiceImpl implements CompanyService {
    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private IpoRepository ipoRepository;

    @Autowired
    private CompanyStockRepository companyStockRepository;

    @Autowired
    private CompanyMapper companyMapper;

    @Autowired
    private IpoMapper ipoMapper;

    @Autowired
    private StockPriceMapper stockPriceMapper;

    @Autowired
    private SectorsService sectorService;

    @Autowired
    private SectorsRepository sectorRepository;

    @Autowired
    private StockExchangeService stockExchangeService;

    @Override
    public List<CompanyDto> getCompanies()
    {
        List<Company> companies = companyRepository.findAll();
        return companyMapper.toCompanyDtos(companies);
    }

    @Override
    public CompanyDto findById(int id)
    {
        Optional<Company> company = companyRepository.findById(id);
        if(!company.isPresent())
            return null;
        return companyMapper.toCompanyDto(company.get());
    }

    @Override
    public List<CompanyDto> getMatchingCompanies(String pattern)
    {
        List<Company> companies = companyRepository.findByCompanyNameIgnoreCaseContaining(pattern);
        return companyMapper.toCompanyDtos(companies);
    }

    @Override
    public CompanyDto addCompany(CompanyDto companyDto)
    {
        Company company = companyMapper.toCompany(companyDto);
        Sectors sector = sectorRepository.findByName(companyDto.getSectorName());
        company.setSectors(sector);
        company = companyRepository.save(company);
        companyDto = companyMapper.toCompanyDto(company);
        sectorService.addCompanyToSector(company.getSectorName(), companyDto);
        String[] stockExchangeNames = company.getStockExchangeName().split(",");
        String[] companyCodes = companyDto.getCompanyCode().split(",");
        for(int i=0; i<companyCodes.length;i++) {
            stockExchangeService.addCompanyToStockExchange(stockExchangeNames[i],companyCodes[i], company);
        }
        return companyDto;
    }

    @Override
    public void deleteCompany(int id) {
        Optional<Company> company = companyRepository.findById(id);
        String[] companyCodes = company.get().getCompanyCode().split(",");
        List<Ipo> ipo = ipoRepository.findByCompanyName(company.get().getCompanyName());
        ipoRepository.deleteAllInBatch(ipo);
        if(companyCodes!=null){
            for( int i=0; i<companyCodes.length;i++)
            {
                CompanyStock companystock = companyStockRepository.findByCompanyCode(companyCodes[i]);
                companyStockRepository.delete(companystock);
            }
        }
        companyRepository.deleteById(id);
    }

    @Override
    public List<IPODto> getCompanyIpoDetails(int id)
    {
        Optional<Company> company = companyRepository.findById(id);
        if(!company.isPresent())
            return null;
        List<Ipo> ipos = company.get().getIpos();
        return ipoMapper.toIPODtos(ipos);
    }

    @Override
    public List<StockPriceDto> getStockPrices(String companyName)
    {
        Company company = companyRepository.findByCompanyName(companyName);
        if(company == null)
            return null;
        return stockPriceMapper.toStockPriceDtos(company.getStockPrices());
    }

    @Override
    public CompanyDto addIpoToCompany(String companyName, IPODto ipoDto)
    {
        Company company = companyRepository.findByCompanyName(companyName);
        if(company == null)
            return null;
        Ipo ipo = ipoMapper.toIPO(ipoDto);
        company.getIpos().add(ipo);
        company = companyRepository.save(company);
        return companyMapper.toCompanyDto(company);
    }

    /* Feign Client Mappings */

    @Override
    public CompanyDto addStockPriceToCompany(String companyCode, StockPriceDto stockPriceDto)
    {
        CompanyStock companystock = companyStockRepository.findByCompanyCode(companyCode);
        Company company=companystock.getCompany();
        if(company == null)
            return null;
        company.getStockPrices().add(stockPriceMapper.toStockPrice(stockPriceDto));
        company = companyRepository.save(company);
        return companyMapper.toCompanyDto(company);
    }
}
