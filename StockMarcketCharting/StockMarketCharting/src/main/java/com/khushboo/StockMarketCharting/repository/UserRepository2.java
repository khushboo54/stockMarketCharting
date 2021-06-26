package com.khushboo.StockMarketCharting.repository;
import com.khushboo.StockMarketCharting.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface UserRepository2 extends CrudRepository<User, Integer> {
    User findByname(String username);
}