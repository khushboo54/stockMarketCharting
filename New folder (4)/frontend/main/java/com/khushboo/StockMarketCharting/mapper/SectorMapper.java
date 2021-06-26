package com.khushboo.StockMarketCharting.mapper;

import com.khushboo.StockMarketCharting.dto.SectorDto;
import com.khushboo.StockMarketCharting.model.Sectors;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class SectorMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public SectorDto toSectorDto(Sectors sector)
    {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        SectorDto sectorDto=modelMapper.map(sector, SectorDto.class);
        return sectorDto;
    }

    public Sectors toSector(SectorDto sectorDto)
    {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        Sectors sector=modelMapper.map(sectorDto,Sectors.class);
        return sector;
    }

    public List<SectorDto> toSectorDtos(List<Sectors> sector)
    {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        List<SectorDto> sectorDtos= Arrays.asList(modelMapper.map(sector,SectorDto[].class));
        return sectorDtos;
    }
}
