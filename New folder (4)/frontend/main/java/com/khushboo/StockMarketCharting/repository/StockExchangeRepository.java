package com.khushboo.StockMarketCharting.repository;

import com.khushboo.StockMarketCharting.model.StockExchange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockExchangeRepository extends JpaRepository<StockExchange,Integer> {
    public StockExchange findByStockExchangeName(String name);
}
