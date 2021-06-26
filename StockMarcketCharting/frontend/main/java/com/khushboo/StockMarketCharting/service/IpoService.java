package com.khushboo.StockMarketCharting.service;

import com.khushboo.StockMarketCharting.dto.IPODto;

import java.util.List;

public interface IpoService {
    public List<IPODto> findAll();
    public IPODto findById(int id);
    public IPODto save(IPODto ipoDto);
    public void deleteById(int id);
}
