package edu.infosys.finCoreBankApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import edu.infosys.finCoreBankApplication.bean.BankUser;
import edu.infosys.finCoreBankApplication.dao.BankUserRepository;
 
 
@Service
public class BankUserService implements UserDetailsService{
	
	@Autowired
	private BankUserRepository repository;
	
	private String role;
	private BankUser user;
	private String userId;
	
	public String getRole() {
		return role;
	}
	public BankUser getUser() {
		return user;
	}
	
	public String getUserId() {
		return userId;
	}
	
	
	public void saveUser(BankUser user) {
		repository.save(user);
	}
	
	
		@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		this.user=repository.findById(username).get();
		this.userId=user.getUsername();
		this.role=user.getRole();
		return this.user;
	}
	

}
