package com.khushboo.StockMarketCharting.repository;

import com.khushboo.StockMarketCharting.model.Ipo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IpoRepository extends JpaRepository<Ipo,Integer> {
    public Optional<Ipo> findById(int id);
    public List<Ipo> findByCompanyName(String name);
    public void deleteById(int id);
}
