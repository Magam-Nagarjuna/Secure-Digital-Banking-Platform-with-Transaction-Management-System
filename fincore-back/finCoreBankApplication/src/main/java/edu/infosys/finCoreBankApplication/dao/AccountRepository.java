package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.infosys.finCoreBankApplication.bean.Account;
import edu.infosys.finCoreBankApplication.bean.Customer;

public interface AccountRepository extends JpaRepository<Account, Long>{
	
	@Query("SELECT MAX(a.accountNumber) FROM Account a")
    public Long getMaxAccountNumber();

    @Query("SELECT a FROM Account a WHERE a.customerId = ?1")
    public List<Account> getAccountsByCustomerId(Long customerId);

    @Query("SELECT a FROM Account a WHERE a.status = ?1")
    public List<Account> getAccountsByStatus(String status);

    @Query("SELECT a FROM Account a WHERE a.accountType = ?1")
    public List<Account> getAccountsByAccountType(String accountType);

}
