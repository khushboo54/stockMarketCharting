package com.khushboo.StockMarketCharting.mapper;

import com.khushboo.StockMarketCharting.dto.StockExchangeDto;
import com.khushboo.StockMarketCharting.model.StockExchange;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class StockExchangeMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public StockExchangeDto toStockExchangeDto(StockExchange stockExchange)
    {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        StockExchangeDto stockExchangeDto=modelMapper.map(stockExchange,StockExchangeDto.class);
        return stockExchangeDto;
    }

    public StockExchange toStockExchange(StockExchangeDto stockExchangeDto)
    {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        StockExchange stockExchange=modelMapper.map(stockExchangeDto,StockExchange.class);
        return stockExchange;
    }

    public List<StockExchangeDto> toStockExchangeDtos(List<StockExchange> stockExchange)
    {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        List<StockExchangeDto> stockExchangeDtos= Arrays.asList(modelMapper.map(stockExchange,StockExchangeDto[].class));
        return stockExchangeDtos;
    }
}
