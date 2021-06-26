package com.khushboo.StockMarketCharting.repository;

import com.khushboo.StockMarketCharting.model.CompanyStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyStockRepository extends JpaRepository<CompanyStock,Integer> {
    public CompanyStock findByCompanyCode(String code);
}
