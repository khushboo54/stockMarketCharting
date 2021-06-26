package com.khushboo.StockMarketCharting.repository;

import com.khushboo.StockMarketCharting.model.StockPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockPriceRepository extends JpaRepository<StockPrice,Integer> {
    public List<StockPrice> findByCompanyCodeAndStockExchangeName(String companyCode, String stockExchangeName);
}
