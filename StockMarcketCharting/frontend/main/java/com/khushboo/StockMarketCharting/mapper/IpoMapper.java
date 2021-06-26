package com.khushboo.StockMarketCharting.mapper;

import com.khushboo.StockMarketCharting.dto.IPODto;
import com.khushboo.StockMarketCharting.model.Ipo;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class IpoMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public IPODto toIPODto(Ipo Ipo)
    {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        IPODto IpoDto=modelMapper.map(Ipo,IPODto.class);
        return IpoDto;
    }

    public Ipo toIPO(IPODto IpoDto)
    {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        Ipo Ipo=modelMapper.map(IpoDto,Ipo.class);
        return Ipo;
    }

    public List<IPODto> toIPODtos(List<Ipo> Ipo)
    {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        List<IPODto> IpoDtos= Arrays.asList(modelMapper.map(Ipo,IPODto[].class));
        return IpoDtos;
    }
}
