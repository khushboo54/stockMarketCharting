package com.khushboo.StockMarketCharting.repository;

import com.khushboo.StockMarketCharting.model.Sectors;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SectorsRepository extends JpaRepository<Sectors,Integer> {
    public Sectors findByName(String sectorName);
}
