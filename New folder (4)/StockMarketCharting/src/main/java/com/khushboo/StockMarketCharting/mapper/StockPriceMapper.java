package com.khushboo.StockMarketCharting.mapper;

import com.khushboo.StockMarketCharting.dto.StockPriceDto;
import com.khushboo.StockMarketCharting.model.StockPrice;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class StockPriceMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public StockPriceDto toStockPriceDto(StockPrice stockPrice)
    {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        StockPriceDto stockPriceDto=modelMapper.map(stockPrice,StockPriceDto.class);
        return stockPriceDto;
    }

    public StockPrice toStockPrice(StockPriceDto stockPriceDto)
    {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        StockPrice stockPrice=modelMapper.map(stockPriceDto,StockPrice.class);
        return stockPrice;
    }

    public List<StockPriceDto> toStockPriceDtos(List<StockPrice> stockPrices)
    {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        List<StockPriceDto> stockPriceDtos= Arrays.asList(modelMapper.map(stockPrices,StockPriceDto[].class));
        return stockPriceDtos;
    }

    public List<StockPrice> toStockPrices(List<StockPriceDto> stockPriceDtos)
    {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        List<StockPrice> stockPrices = Arrays.asList(mapper.map(stockPriceDtos, StockPrice[].class));
        return stockPrices;
    }
}
