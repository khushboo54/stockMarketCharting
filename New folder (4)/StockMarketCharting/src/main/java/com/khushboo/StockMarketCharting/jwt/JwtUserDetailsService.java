package com.khushboo.StockMarketCharting.jwt;
import java.util.ArrayList;
// add jwt.secret=abcd to application properties

import com.khushboo.StockMarketCharting.dto.UserDto;
import com.khushboo.StockMarketCharting.repository.UserRepository2;
import com.khushboo.StockMarketCharting.repository.Userrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	@Autowired
	Userrepository userrepo;
   
	@Autowired
	UserRepository2 userrepo2;
	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		com.khushboo.StockMarketCharting.model.User user = userrepo2.findByname(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(user.getname(), user.getpassword(),
				new ArrayList<>());
	}

	public com.khushboo.StockMarketCharting.model.User save(UserDto user) {
		com.khushboo.StockMarketCharting.model.User newUser = new com.khushboo.StockMarketCharting.model.User();
		newUser.setname(user.getUsername());
		newUser.setpassword(bcryptEncoder.encode(user.getPassword()));
		return userrepo.save(newUser);
	}

/*
		if ("abcd".equals(username)) {
			return new User("abcd", "$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6",
					new ArrayList<>());
		} else {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		
	}*/
	/*	public Userrepository save(UserDTO user) {
			com.stockexchange.phase3.User newUser = new com.stockexchange.phase3.User(null, null, null);
			newUser.setname(user.getname());
			newUser.setpassword(bcryptEncoder.encode(user.getPassword()));
			return (Userrepository) userrepo.save(newUser);
		}*/



	}