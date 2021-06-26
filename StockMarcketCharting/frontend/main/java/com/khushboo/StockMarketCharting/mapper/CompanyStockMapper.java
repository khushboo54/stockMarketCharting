package com.khushboo.StockMarketCharting.mapper;

import com.khushboo.StockMarketCharting.dto.CompanyStockDto;
import com.khushboo.StockMarketCharting.model.CompanyStock;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class CompanyStockMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public CompanyStockDto toCompanyStockDto(CompanyStock companystock)
    {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        CompanyStockDto companyStockDto=modelMapper.map(companystock,CompanyStockDto.class);
        return companyStockDto;
    }

    public CompanyStock toCompanyStock(CompanyStockDto companyStockDto)
    {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        CompanyStock companystock=modelMapper.map(companyStockDto,CompanyStock.class);
        return companystock;
    }

    public List<CompanyStockDto> toCompanyStockDtos(List<CompanyStock> companystocks)
    {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        List<CompanyStockDto> companyStockDtos= Arrays.asList(modelMapper.map(companystocks,CompanyStockDto[].class));
        return companyStockDtos;
    }
}
