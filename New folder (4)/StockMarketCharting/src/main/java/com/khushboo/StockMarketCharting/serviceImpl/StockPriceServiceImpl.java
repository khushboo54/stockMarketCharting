package com.khushboo.StockMarketCharting.serviceImpl;

import com.khushboo.StockMarketCharting.dto.CompanyCompareRequest;
import com.khushboo.StockMarketCharting.dto.CompanyDto;
import com.khushboo.StockMarketCharting.dto.SectorCompareRequest;
import com.khushboo.StockMarketCharting.dto.StockPriceDto;
import com.khushboo.StockMarketCharting.mapper.CompanyMapper;
import com.khushboo.StockMarketCharting.mapper.StockPriceMapper;
import com.khushboo.StockMarketCharting.model.CompanyStock;
import com.khushboo.StockMarketCharting.model.StockPrice;
import com.khushboo.StockMarketCharting.repository.CompanyStockRepository;
import com.khushboo.StockMarketCharting.repository.StockPriceRepository;
import com.khushboo.StockMarketCharting.service.SectorsService;
import com.khushboo.StockMarketCharting.service.StockPriceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StockPriceServiceImpl implements StockPriceService {
    @Autowired
    private StockPriceRepository stockPriceRepository;

    @Autowired
    private CompanyStockRepository companyStockRepository;

    @Autowired
    private StockPriceMapper stockPriceMapper;

    @Autowired
    private CompanyMapper companyMapper;

    @Autowired
    private SectorsService sectorService;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    public List<StockPriceDto> findAll() {
        List<StockPrice> stockPrices = stockPriceRepository.findAll();
        return stockPriceMapper.toStockPriceDtos(stockPrices);
    }

    public StockPriceDto findById(int id) {
        Optional<StockPrice> stockPrice = stockPriceRepository.findById(id);
        if(!stockPrice.isPresent())
            return null;
        return stockPriceMapper.toStockPriceDto(stockPrice.get());
    }

    public List<StockPriceDto> save(List<StockPriceDto> stockPriceDtos)
    {
        List<StockPrice> stockPrices = stockPriceMapper.toStockPrices(stockPriceDtos);
        List<StockPrice> sp1 = new ArrayList<StockPrice>();
        for(StockPrice sp:stockPrices){
            CompanyStock companystock = companyStockRepository.findByCompanyCode(sp.getCompanyCode());
            sp.setCompany(companystock.getCompany());
            StockPrice sp2 = stockPriceRepository.save(sp);
            sp1.add(sp2);
        }
        return stockPriceMapper.toStockPriceDtos(sp1);
    }

    public StockPriceDto update(StockPriceDto stockPriceDto)
    {
        if(findById(stockPriceDto.getId()) == null)
            return null;
        StockPrice stockprice =stockPriceMapper.toStockPrice(stockPriceDto);
        CompanyStock companystock = companyStockRepository.findByCompanyCode(stockprice.getCompanyCode());
        stockprice.setCompany(companystock.getCompany());
        StockPrice stockPrice = stockPriceRepository.save(stockprice);
        return stockPriceMapper.toStockPriceDto(stockPrice);
    }

    public void deleteById(int id) {
        stockPriceRepository.deleteById(id);
    }

    @Override
    public List<StockPriceDto> getStockPricesForCompanyComparison(CompanyCompareRequest compareRequest)
            throws ParseException
    {
        Date fromDate = new SimpleDateFormat("dd-MM-yyyy").parse(compareRequest.getFromPeriod());
        Date toDate = new SimpleDateFormat("dd-MM-yyyy").parse(compareRequest.getToPeriod());
        List<StockPrice> stockPrices = stockPriceRepository
                .findByCompanyCodeAndStockExchangeName(compareRequest.getCompanyCode(), compareRequest.getStockExchangeName());
        List<StockPrice> filteredList = stockPrices.stream()
                .filter(stockPrice -> {
                    Date date = null;
                    try {
                        date = new SimpleDateFormat("dd-MM-yyyy").parse(stockPrice.getDate());
                    } catch (ParseException e) {
                        e.printStackTrace();
                    }
                    return date.after(fromDate) && date.before(toDate);
                })
                .collect(Collectors.toList());
        logger.info("{}",filteredList);
        return stockPriceMapper.toStockPriceDtos(filteredList);
    }

    @Override
    public List<StockPriceDto> getStockPricesForSectorComparison(SectorCompareRequest compareRequest)
            throws ParseException
    {
        Date fromDate = new SimpleDateFormat("dd-MM-yyyy").parse(compareRequest.getFromPeriod());
        Date toDate = new SimpleDateFormat("dd-MM-yyyy").parse(compareRequest.getToPeriod());
        List<StockPrice> stockPricesForSector = new ArrayList<>();
        for(CompanyDto companyDto: sectorService.getSectorCompanies(compareRequest.getSectorName()))
        {
            List<CompanyStock> companystocks = (companyMapper.toCompany(companyDto)).getCompanyStocks();
            for(CompanyStock cs: companystocks)
            {
                List<StockPrice> stockPrices = stockPriceRepository
                        .findByCompanyCodeAndStockExchangeName(cs.getCompanyCode(), compareRequest.getStockExchangeName());
                List<StockPrice> filteredList = stockPrices.stream()
                        .filter(stockPrice -> {
                            Date date = null;
                            try {
                                date = new SimpleDateFormat("dd-MM-yyyy").parse(stockPrice.getDate());
                            } catch (ParseException e) {
                                e.printStackTrace();
                            }

                            return date.after(fromDate) && date.before(toDate);
                        })
                        .collect(Collectors.toList());
                stockPricesForSector.addAll(filteredList);
            }
        }
        logger.info("{}",stockPricesForSector);
        return stockPriceMapper.toStockPriceDtos(stockPricesForSector);
    }
}
