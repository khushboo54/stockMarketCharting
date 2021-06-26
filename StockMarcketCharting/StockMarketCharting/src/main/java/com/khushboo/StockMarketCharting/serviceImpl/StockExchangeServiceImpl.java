package com.khushboo.StockMarketCharting.serviceImpl;

import com.khushboo.StockMarketCharting.dto.CompanyDto;
import com.khushboo.StockMarketCharting.dto.StockExchangeDto;
import com.khushboo.StockMarketCharting.mapper.CompanyMapper;
import com.khushboo.StockMarketCharting.mapper.CompanyStockMapper;
import com.khushboo.StockMarketCharting.mapper.StockExchangeMapper;
import com.khushboo.StockMarketCharting.model.Company;
import com.khushboo.StockMarketCharting.model.CompanyStock;
import com.khushboo.StockMarketCharting.model.StockExchange;
import com.khushboo.StockMarketCharting.repository.CompanyRepository;
import com.khushboo.StockMarketCharting.repository.CompanyStockRepository;
import com.khushboo.StockMarketCharting.repository.StockExchangeRepository;
import com.khushboo.StockMarketCharting.service.StockExchangeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StockExchangeServiceImpl implements StockExchangeService {
    @Autowired
    private StockExchangeRepository stockExchangeRepository;

    @Autowired
    private CompanyStockRepository companyStockRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private StockExchangeMapper stockExchangeMapper;

    @Autowired
    private CompanyMapper companyMapper;

    @Autowired
    private CompanyStockMapper companyStockMapper;


    @Override
    public List<StockExchangeDto> findAll() {
        Iterable<StockExchange> st = stockExchangeRepository.findAll();

        List<StockExchange> stockExchanges = new ArrayList<>();

        // Add each element of iterator to the List
        for (StockExchange s : st) {
            stockExchanges.add(s);
        }
        return stockExchangeMapper.toStockExchangeDtos(stockExchanges);
    }

    @Override
    public StockExchangeDto findById(int id) {
        Optional<StockExchange> stockExchange = stockExchangeRepository.findById(id);
        if (!stockExchange.isPresent())
            return null;
        return stockExchangeMapper.toStockExchangeDto(stockExchange.get());
    }

    @Override
    public StockExchangeDto save(StockExchangeDto stockExchangeDto) {
        StockExchange stockExchange = stockExchangeMapper.toStockExchange(stockExchangeDto);
        stockExchange = stockExchangeRepository.save(stockExchange);
        return stockExchangeMapper.toStockExchangeDto(stockExchange);
    }

    @Override
    public StockExchangeDto update(StockExchangeDto stockExchangeDto) {
        if (findById(stockExchangeDto.getId()) == null)
            return null;
        StockExchange stockExchange = stockExchangeMapper.toStockExchange(stockExchangeDto);
        stockExchange = stockExchangeRepository.save(stockExchange);
        return stockExchangeMapper.toStockExchangeDto(stockExchange);
    }

    @Override
    public void delete(int id) {
        stockExchangeRepository.deleteById(id);
    }

    @Override
    public List<CompanyDto> getCompanies(int id)
    {
        Optional<StockExchange> stockExchange = stockExchangeRepository.findById(id);
        if(!stockExchange.isPresent())
            return null;
        Iterable<CompanyStock> ct = stockExchange.get().getCompanyStocks();
        List<Company> company = new ArrayList<>();

        // Add each element of iterator to the List
        for (CompanyStock s : ct) {
            company.add(s.getCompany());
        }
        return companyMapper.toCompanyDtos(company);
    }

    @Override
    public StockExchangeDto addCompanyToStockExchange(String stockExchangeName,String companyCode, Company company)
    {
        StockExchange stockExchange = stockExchangeRepository.findByStockExchangeName(stockExchangeName);
        if(stockExchange == null)
            return null;
        CompanyStock cs = new CompanyStock(companyCode,company,stockExchange);
        companyStockRepository.save(cs);
        stockExchange.getCompanyStocks().add(cs);
        company.getCompanyStocks().add(cs);
        Company company1 = companyRepository.save(company);
        stockExchange = stockExchangeRepository.save(stockExchange);
        return stockExchangeMapper.toStockExchangeDto(stockExchange);
    }
}
