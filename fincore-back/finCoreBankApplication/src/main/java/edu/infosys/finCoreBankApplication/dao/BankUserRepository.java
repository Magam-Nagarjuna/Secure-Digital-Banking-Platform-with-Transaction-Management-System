package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.infosys.finCoreBankApplication.bean.BankUser;


@Repository
public interface BankUserRepository extends JpaRepository<BankUser, String> {
	@Query("Select username from BankUser where role=?1")
	public List<String> getUsersByRole(String role);

}
