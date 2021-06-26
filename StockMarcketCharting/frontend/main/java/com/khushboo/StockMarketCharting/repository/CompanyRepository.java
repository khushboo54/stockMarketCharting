package com.khushboo.StockMarketCharting.repository;

import com.khushboo.StockMarketCharting.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company,Integer> {
    public Optional<Company> findById(int id);
    public List<Company> findByCompanyNameIgnoreCaseContaining(String pattern);
    public Company findByCompanyName(String name);
}
