
package com.khushboo.StockMarketCharting.repository;

import java.util.Optional;

import com.khushboo.StockMarketCharting.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import org.springframework.data.repository.CrudRepository;
@Repository
//public interface Userrepository extends JpaRepository<User, Long> {
public interface Userrepository extends JpaRepository<User, Long>{
	
	


	Boolean existsByEmail(String email);
	
}
