package com.khushboo.StockMarketCharting.mapper;

import com.khushboo.StockMarketCharting.dto.CompanyDto;
import com.khushboo.StockMarketCharting.model.Company;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class CompanyMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public CompanyDto toCompanyDto(Company company)
    {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        CompanyDto companyDto=modelMapper.map(company,CompanyDto.class);
        return companyDto;
    }

    public Company toCompany(CompanyDto companyDto)
    {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        Company company=modelMapper.map(companyDto,Company.class);
        return company;
    }

    public List<CompanyDto> toCompanyDtos(List<Company> company)
    {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        List<CompanyDto> companyDtos= Arrays.asList(modelMapper.map(company,CompanyDto[].class));
        return companyDtos;
    }

    public List<Company> toCompanies(List<CompanyDto> companyDtos)
    {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        List<Company> companies= Arrays.asList(modelMapper.map(companyDtos,Company[].class));
        return companies;
    }
}
