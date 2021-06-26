package com.khushboo.StockMarketCharting.mapper;

import com.khushboo.StockMarketCharting.dto.CompanyDto;
import com.khushboo.StockMarketCharting.dto.UserDto;
import com.khushboo.StockMarketCharting.model.Company;
import com.khushboo.StockMarketCharting.model.User;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    public UserDto toUserDto(User user)
    {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        UserDto userDto=modelMapper.map(user,UserDto.class);
        return userDto;
    }

    public User toUser(UserDto userDto)
    {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        User user=modelMapper.map(userDto,User.class);
        return user;
    }
}
